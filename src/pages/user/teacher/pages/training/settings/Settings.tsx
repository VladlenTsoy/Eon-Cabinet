import React, {useCallback, useState} from 'react';
import {BrowserRouter as Router, useHistory, useRouteMatch} from "react-router-dom";
import {Switch, Route} from "react-router";
import {useChangeActionNavbar} from "hooks/use-change-action-navbar.effect";
import {Col, Row} from "antd";
import {Card, LoadingBlock} from "lib/ui";
import styled from "styled-components";
import {changeSetting, changeExecutionMode} from "store/common/game/gameSplice";
import {useLanguage} from "../../../../../../hooks/use-language";
import {useUser} from "../../../../../../hooks/use-user";
import {useTeacherDispatch} from "../../../../../../store/access/teacher/store";
import {updateUser} from "../../../../../../store/common/user/updateUser";

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

// TODO - api
const Tasks: React.FC = () => {
    const {language} = useLanguage();
    const {user} = useUser();
    const match = useRouteMatch<TasksRouteProps>();
    const history = useHistory();
    const {discipline, task} = match.params;
    const dispatch = useTeacherDispatch();

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
    const updateSetting = useCallback(async (setting: any) => {
        try {
            let userSetting = Object.keys(user.setting).length ? user.setting : {};
            console.log(userSetting.tasks)
            // userSetting.tasks = userSetting.tasks || [];

            const keySetting = userSetting.tasks.findIndex(
                (item: any) => Number(item.discipline) === Number(discipline) && Number(item.task) === Number(task)
            );
            keySetting < 0 ?
                userSetting.tasks.push({discipline, task, setting}) :
                userSetting.tasks[keySetting].setting = setting;

            dispatch(updateUser({userId: user.id, data: {setting: userSetting}}))
        } catch (e) {
            console.error(e);
        }
    }, [user.setting, discipline, task, user.id]);

    // Очистка настроек для текущего упражнения
    const clearSaveSetting = useCallback(async () => await updateSetting({}), [updateSetting]);


    /**
     * Начать упражнение или распечатать и сохранить настройки для текущего урпажнения
     *
     * @param setting
     * @param print
     */
    const startOrPrintAndSaveSetting = useCallback(
        async (setting: any, print?: boolean) => {
            dispatch(changeExecutionMode('fetch'));
            dispatch(changeSetting(setting));
            await updateSetting(setting);
            if (print) {
                let url = '/algorithm/list';
                let _setting = setting;
                _setting.print = true;

                const {pdfRender} = await import("./print/general");

                if (task === '24') {
                    url = `/custom-exercises/${_setting.custom_exercises_id}/print`;
                    // const response = await api.user.get(url, {params: _setting});
                    // await pdfRender(response.data.settings, response.data, language.common);
                } else {
                    // const response = await api.user.get(url, {params: _setting});
                    // await pdfRender(_setting, response.data, language.common);
                }

            } else
                history.push(`/training/${discipline}/${task}`);
        },
        [history, discipline, task, dispatch, updateSetting, language.common]
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