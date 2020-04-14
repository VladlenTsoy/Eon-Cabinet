import React, {useCallback, useState} from 'react';
import {BrowserRouter as Router, RouteComponentProps} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Switch, Route} from "react-router";
import {useChangeActionNavbar} from "../../../../../effects/use-change-action-navbar.effect";
import {setCurrentUserData} from "../../../../../store/user/actions";
import {gameChangeSetting} from "../../../../../store/game/actions";
import {pdfRender} from "./print/general";
import {Col, Row} from "antd";
import {Card, Loader} from "lib";
import styled from "styled-components";

const Mental = React.lazy(() => import("./mental/Mental"));
const Mnemonics = React.lazy(() => import("./mnemonics/Mnemonics"));


const TasksWrapper: any = styled<any>(Row)`
  height: ${(props: any) => props.max === 'true' ? '100%' : 'auto'};
  
  .ant-col{
    height: 100%;
    
    .ant-card{
      height: 100%;
      margin-bottom: 0;
      
      .ant-card-body{
        height: 100%;
      }
    }
  }
`;

interface TasksRouteProps {
    discipline: string;
    task: string;
}

const Tasks: React.FC<RouteComponentProps<TasksRouteProps>> = (
    {
        match,
        history
    }
) => {
    const {api, user, language} = useSelector((state: any) => state);
    const {discipline, task} = match.params;
    const [setting] = useState<any>(() => {
        try {
            // let userSetting = user.setting.tasks[discipline][task];
            // userSetting.mode = String(userSetting.mode);
            return user.setting.tasks[discipline][task];
        } catch (e) {
            return {}
        }
    });
    const dispatch = useDispatch();

    // Действие назад
    useChangeActionNavbar({action: '/training'});

    /**
     * Изменение настроек для текущего упражнения и сохранение их на сервере
     *
     * @param setting
     */
    const changeSetting = useCallback(async (setting: any) => {
        try {
            let userSetting = user.setting;
            userSetting.tasks = userSetting.tasks || [];
            userSetting.tasks[discipline] = userSetting.tasks[discipline] || [];
            userSetting.tasks[discipline][task] = userSetting.tasks[discipline][task] || [];
            userSetting.tasks[discipline][task] = setting;

            let response = await api.user_general.patch(`/${user.id}`, {setting: userSetting});
            dispatch(setCurrentUserData(response.data));
        } catch (e) {

        }
    }, [user.setting, dispatch, api.user_general, discipline, task, user.id]);

    // Очистка настроек для текущего упражнения
    const clearSaveSetting = useCallback(async () => await changeSetting({}), [changeSetting]);


    /**
     * Начать упражнение или распечатать и сохранить настройки для текущего урпажнения
     *
     * @param setting
     * @param print
     */
    const startOrPrintAndSaveSetting = useCallback(
        async (setting: any, print?: boolean) => {
            await dispatch(gameChangeSetting(setting));
            await changeSetting(setting);
            if (print) {
                setting.print = true;
                const response = await api.user_general.get('/algorithm/list', {params: setting});
                await pdfRender(setting, response.data, language.common);
            } else
                history.push(`/training/${discipline}/${task}`);
        },
        [history, discipline, task, dispatch, changeSetting, api.user_general, language.common]
    );

    return <React.Suspense fallback={<Loader text="Загрузка упражнений..."/>}>
        <TasksWrapper

            justify="center"
            align="middle"
            gutter={15}
            max={(Number(task) === 21).toString()}
        >
            <Col {...(Number(task) === 21 ? {span: 24} : {xxl: 9, xl: 14, lg: 16, xs: 24})}>
                <Card>
                    <Router>
                        <Switch>
                            <Route path="/training/1">
                                <Mental
                                    setting={setting}
                                    clearSaveSetting={clearSaveSetting}
                                    startOrPrintAndSaveSetting={startOrPrintAndSaveSetting}
                                />
                            </Route>
                            <Route path="/training/2">
                                <Mnemonics
                                    setting={setting}
                                    clearSaveSetting={clearSaveSetting}
                                    startOrPrintAndSaveSetting={startOrPrintAndSaveSetting}
                                />
                            </Route>
                        </Switch>
                    </Router>
                </Card>
            </Col>
        </TasksWrapper>
    </React.Suspense>

};

export default Tasks;