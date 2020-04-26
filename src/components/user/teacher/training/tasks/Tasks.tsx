import React, {useCallback, useState} from 'react';
import {BrowserRouter as Router, useHistory, useRouteMatch} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Switch, Route} from "react-router";
import {useChangeActionNavbar} from "effects/use-change-action-navbar.effect";
import {setCurrentUserData} from "../../../../../store/user/actions";
import {Col, Row} from "antd";
import {Card, LoadingBlock} from "lib";
import styled from "styled-components";
import {settingChange} from "../../../../../store/tasks/setting/action";

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

const Tasks: React.FC = () => {
    const {api, user, language} = useSelector((state: any) => state);
    const match = useRouteMatch<TasksRouteProps>();
    const history = useHistory();
    const {discipline, task} = match.params;
    const dispatch = useDispatch();

    const [setting] = useState<any>(() => {
        try {
            let userSetting = user.setting.tasks
                .find((item: any) =>
                    Number(item.discipline) === Number(discipline) && Number(item.task) === Number(task));
            return userSetting.setting || {};
        } catch (e) {
            return {}
        }
    });

    // Действие назад
    useChangeActionNavbar({action: '/training'});

    /**
     * Изменение настроек для текущего упражнения и сохранение их на сервере
     *
     * @param setting
     */
    const changeSetting = useCallback(async (setting: any) => {
        try {
            let userSetting = Object.keys(user.setting).length ? user.setting : {};
            userSetting.tasks = userSetting.tasks && userSetting.tasks[0] && userSetting.tasks[0].hasOwnProperty('discipline') ?
                userSetting.tasks : [];

            const keySetting = userSetting.tasks.findIndex(
                (item: any) => Number(item.discipline) === Number(discipline) && Number(item.task) === Number(task)
            );
            keySetting < 0 ?
                userSetting.tasks.push({discipline, task, setting}) :
                userSetting.tasks[keySetting].setting = setting;

            let response = await api.user_general.patch(`/${user.id}`, {setting: userSetting});
            dispatch(setCurrentUserData(response.data));
        } catch (e) {
            console.error(e);
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
            await dispatch(settingChange(setting));
            await changeSetting(setting);
            if (print) {
                let url = '/algorithm/list';
                let _setting = setting;
                _setting.print = true;

                const {pdfRender} = await import("./print/general");

                if (task === '24') {
                    url = `/custom-exercises/${_setting.custom_exercises_id}/print`;
                    const response = await api.user_general.get(url, {params: _setting});
                    await pdfRender(response.data.settings, response.data, language.common);
                } else {
                    const response = await api.user_general.get(url, {params: _setting});
                    await pdfRender(_setting, response.data, language.common);
                }

            } else
                history.push(`/training/${discipline}/${task}`);
        },
        [history, discipline, task, dispatch, changeSetting, api.user_general, language.common]
    );

    return <React.Suspense fallback={<LoadingBlock title="Загрузка упражнений..."/>}>
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