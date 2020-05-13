import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {
    gameChangeCurrentTimes, gameChangeExecutionMode,
    gameChangeStats,
    gameChangeStatus,
} from "store/game/actions";
import {totalsChange} from "store/tasks/totals/action";
import {settingChange} from "store/tasks/setting/action";
import {settingAnzan} from "store/tasks/setting/reducer";
import {LoadingBlock} from "lib";
import {useChangeActionNavbar} from "../../../../effects/use-change-action-navbar.effect";

const Mental = React.lazy(() => import("./mental/Mental"));
const Mnemonics = React.lazy(() => import("./mnemonics/Mnemonics"));


interface TasksProps {
    urlBack: string;
    urlRoute: string;
}

const TasksRoutes: React.FC<TasksProps> = ({urlBack, urlRoute}) => {
    const history = useHistory();
    const setting = useSelector(settingAnzan);
    const dispatch = useDispatch();

    if (!setting) history.push(urlBack);

    useChangeActionNavbar({action: 'cancel'});

    // Button cancel
    useEffect(() => {
        return () => {
            dispatch(settingChange(null));
            dispatch(gameChangeStatus('start'));
            dispatch(gameChangeExecutionMode('first'));
            dispatch(totalsChange([]));
            dispatch(gameChangeStats({all: 0, success: 0}));
            dispatch(gameChangeCurrentTimes(0));
        }
    }, [dispatch]);

    return <React.Suspense fallback={<LoadingBlock title="Загрузка упражнения..."/>}>
        <Router>
            <Switch>
                {/* Ментальная арифметика */}
                <Route path={`${urlRoute}/1`} children={<Mental url={urlRoute}/>}/>
                {/* Мнемотехника */}
                <Route path={`${urlRoute}/2`} children={<Mnemonics url={urlRoute}/>}/>
            </Switch>
        </Router>
    </React.Suspense>;
};

export default TasksRoutes;