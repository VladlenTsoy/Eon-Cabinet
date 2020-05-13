import {BrowserRouter as Router, Route, RouteComponentProps, Switch} from "react-router-dom";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useChangeActionNavbar} from "effects/use-change-action-navbar.effect";
import {
    gameChangeCurrentTimes,
    gameChangeStats,
    gameChangeStatus,
} from "store/game/actions";
import {settingChange} from "../../../../../store/tasks/setting/action";
import {totalsChange} from "../../../../../store/tasks/totals/action";
import {settingAnzan} from "../../../../../store/tasks/setting/reducer";
import {LoadingBlock} from "../../../../../lib";

const Mental = React.lazy(() => import("./mental/Mental"));
const Mnemonics = React.lazy(() => import("./mnemonics/Mnemonics"));

interface MatchProps {
    sentOlympiadId: string;
}

type TasksProps = RouteComponentProps<MatchProps>;

const Tasks: React.FC<TasksProps> = ({history, match}) => {
    const setting = useSelector(settingAnzan);
    const {sentOlympiadId} = match.params;

    const dispatch = useDispatch();

    if (!setting)
        history.push(`/olympiads/${sentOlympiadId}`);

    useChangeActionNavbar({action: 'cancel'});

    // Button cancel
    useEffect(() => {
        if (window.speechSynthesis && window.speechSynthesis.getVoices)
            window.speechSynthesis.getVoices();
        return () => {
            dispatch(settingChange(null));
            dispatch(gameChangeStatus('start'));
            dispatch(totalsChange([]));
            dispatch(gameChangeStats({all: 0, success: 0}));
            dispatch(gameChangeCurrentTimes(0));
        }
    }, [dispatch]);

    return <React.Suspense fallback={<LoadingBlock title="Загрузка упражнения..."/>}>
        <Router>
            <div style={{height: '100%'}}>
                <Switch>
                    {/* Ментальная арифметика */}
                    <Route path="/olympiads/1" children={<Mental/>}/>
                    {/* Мнемотехника */}
                    <Route path="/olympiads/2" children={<Mnemonics/>}/>
                </Switch>
            </div>
        </Router>
    </React.Suspense>;
};

export default Tasks;