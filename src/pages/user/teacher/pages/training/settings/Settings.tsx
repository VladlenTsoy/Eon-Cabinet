import React, {useCallback} from "react"
import {
    BrowserRouter as Router,
    useHistory,
    useRouteMatch
} from "react-router-dom"
import {Switch, Route} from "react-router"
import {useChangeActionNavbar} from "hooks/old/use-change-action-navbar.effect"
import {Col, Row} from "antd"
import {Card, LoadingBlock} from "lib/ui"
import styled from "styled-components"
import {useDispatch} from "store/store"
import {getCookie, setCookie} from "../../../../../../utils/cookie"
import {createList} from "store/lists/createList"
import {changeExecutionMode, changeSetting} from "store/game/gameSplice"

const Mental = React.lazy(() => import("./mental/Mental"))
const Mnemonics = React.lazy(() => import("./mnemonics/Mnemonics"))

const TasksWrapper: any = styled<any>(Row)`
    height: ${(props: any) => (props.max === "true" ? "100%" : "auto")};

    .ant-col {
        height: 100%;

        .ant-card {
            height: 100%;
            margin-bottom: 0;

            .ant-card-body {
                height: 100%;
            }
        }
    }
`

interface TasksRouteProps {
    discipline: string
    task: string
}

const Tasks: React.FC = () => {
    const match = useRouteMatch<TasksRouteProps>()
    const history = useHistory()
    const {discipline, task} = match.params
    const dispatch = useDispatch()

    const _setting = getCookie(`setting_${discipline}_${task}`)
    const setting = _setting ? JSON.parse(String(_setting)) : _setting

    useChangeActionNavbar({action: "/training"})

    /**
     * Изменение настроек для текущего упражнения и сохранение их на сервере
     * @param setting
     */
    const updateSetting = useCallback(
        (setting: any) =>
            setCookie(`setting_${discipline}_${task}`, setting, {
                expires: 7
            }),
        [discipline, task]
    )

    /**
     * Очистка настроек для текущего упражнения
     */
    const clearSaveSetting = useCallback(async () => await updateSetting({}), [
        updateSetting
    ])

    /**
     * Начать упражнение или распечатать и сохранить настройки для текущего урпажнения
     * @param setting
     * @param print
     */
    const startOrPrintAndSaveSetting = useCallback(
        async (setting: any, print?: boolean) => {
            dispatch(changeExecutionMode("fetch"))
            dispatch(changeSetting(setting))
            await updateSetting(setting)

            if (print) {
                //     const {pdfRender} = await import("./print/general")
                dispatch(createList({task, setting}))
                // let url = "/algorithm/list"
                // let _setting = setting
                // _setting.print = true
                // if (task === "24") {
                //     url = `/custom-exercises/${_setting.custom_exercises_id}/print`
                // const response = await api.user.get(url, {params: _setting});
                // await pdfRender(response.data.settings, response.data, language.common);
                // } else {
                // const response = await api.user.get(url, {params: _setting});
                // await pdfRender(_setting, response.data, language.common);
                // }
            } else
                history.push(`/training/${discipline}/${task}`)
        },
        [history, discipline, task, dispatch, updateSetting]
    )

    return (
        <React.Suspense
            fallback={<LoadingBlock title="Загрузка упражнений..."/>}
        >
            <TasksWrapper
                justify="center"
                align="middle"
                gutter={15}
                max={(Number(task) === 21).toString()}
            >
                <Col
                    {...(Number(task) === 21
                        ? {span: 24}
                        : {xxl: 9, xl: 14, lg: 16, xs: 24})}
                >
                    <Card>
                        <Router>
                            <Switch>
                                <Route path="/training/1">
                                    <Mental
                                        setting={setting}
                                        clearSaveSetting={clearSaveSetting}
                                        startOrPrintAndSaveSetting={
                                            startOrPrintAndSaveSetting
                                        }
                                    />
                                </Route>
                                <Route path="/training/2">
                                    <Mnemonics
                                        setting={setting}
                                        clearSaveSetting={clearSaveSetting}
                                        startOrPrintAndSaveSetting={
                                            startOrPrintAndSaveSetting
                                        }
                                    />
                                </Route>
                            </Switch>
                        </Router>
                    </Card>
                </Col>
            </TasksWrapper>
        </React.Suspense>
    )
}

export default Tasks
