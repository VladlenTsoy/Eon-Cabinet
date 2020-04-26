import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {appChangeActionNavbar} from "store/app/actions";
import {
    gameChangeCurrentTimes, gameChangeExecutionMode,
    gameChangeStats,
    gameChangeStatus,
} from "store/game/actions";
import {totalsChange} from "store/tasks/totals/action";
import {settingChange} from "store/tasks/setting/action";
import {settingAnzan} from "store/tasks/setting/reducer";
import {LoadingBlock} from "lib";

const Mental = React.lazy(() => import("./mental/Mental"));
const Mnemonics = React.lazy(() => import("./mnemonics/Mnemonics"));

const Tasks = ({history, match}: any) => {
    const setting = useSelector(settingAnzan);
    const {discipline, task} = match.params;

    const dispatch = useDispatch();

    if (!setting)
        history.push(`/training/${discipline}/${task}/setting`);

    // Button cancel
    useEffect(() => {
        dispatch(appChangeActionNavbar('cancel'));
        window.speechSynthesis.getVoices();
        return () => {
            dispatch(appChangeActionNavbar(null));
            dispatch(settingChange(null));
            dispatch(gameChangeStatus('start'));
            dispatch(gameChangeExecutionMode('first'));
            dispatch(totalsChange([]));
            dispatch(gameChangeStats({all: 0, success: 0}));
            dispatch(gameChangeCurrentTimes(1));
        }
    }, [dispatch]);

    return <React.Suspense fallback={<LoadingBlock title="Загрузка упражнения..."/>}>
        <Router>
            <Switch>
                {/* Ментальная арифметика */}
                <Route path="/training/1" children={<Mental/>}/>
                {/* Мнемотехника */}
                <Route path="/training/2" children={<Mnemonics/>}/>
            </Switch>
        </Router>
    </React.Suspense>;
};

export default Tasks;