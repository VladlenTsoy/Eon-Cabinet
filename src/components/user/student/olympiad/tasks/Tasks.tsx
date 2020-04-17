import {BrowserRouter as Router, Route, RouteComponentProps, Switch} from "react-router-dom";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useChangeActionNavbar} from "effects/use-change-action-navbar.effect";
import {
    gameChangeCurrentTimes,
    gameChangeSetting,
    gameChangeStats,
    gameChangeStatus,
    gameChangeTotals
} from "store/game/actions";
import Anzan from "components/user/student/olympiad/tasks/mental/anzan/Anzan";
import FlashAnzan from "components/user/student/olympiad/tasks/mental/flash-anzan/FlashAnzan";
import SpecialAnzan from "components/user/student/olympiad/tasks/mental/special-anzan/SpecialAnzan";
import Progression from "components/user/student/olympiad/tasks/mental/progression/Progression";
import WordList from "components/user/student/olympiad/tasks/mnemonics/word-list/WordList";
import DigitalRow from "components/user/student/olympiad/tasks/mnemonics/digital-row/DigitalRow";
import Numbers from "components/user/student/olympiad/tasks/mnemonics/numbers/Numbers";
import Personalities from "components/user/student/olympiad/tasks/mnemonics/personalities/Personalities";
import Countries from "components/user/student/olympiad/tasks/mnemonics/countries/Countries";
import DigitalPicture from "components/user/student/olympiad/tasks/mnemonics/digital-picture/DigitalPicture";
import MasterSystem from "components/user/student/olympiad/tasks/mnemonics/master-system/MasterSystem";
import CustomExercises from "components/user/student/olympiad/tasks/mental/custom-exercises/CustomExercises";

interface MatchProps {
    sentOlympiadId: string;
}

type TasksProps = RouteComponentProps<MatchProps>;

const Tasks: React.FC<TasksProps> = ({history, match}) => {
    const {game} = useSelector((state: any) => state);
    const {sentOlympiadId} = match.params;

    const dispatch = useDispatch();

    if (!game.setting)
        history.push(`/olympiads/${sentOlympiadId}`);

    useChangeActionNavbar({action: 'cancel'});

    // Button cancel
    useEffect(() => {
        if (window.speechSynthesis && window.speechSynthesis.getVoices)
            window.speechSynthesis.getVoices();
        return () => {
            dispatch(gameChangeSetting(null));
            dispatch(gameChangeStatus('start'));
            dispatch(gameChangeTotals([]));
            dispatch(gameChangeStats({all: 0, success: 0}));
            dispatch(gameChangeCurrentTimes(1));
        }
    }, [dispatch]);

    return <Router>
        <div style={{height: '100%'}}>
            <Switch>
                <Route exact path="/olympiads/:sentOlympiadId/:taskOlympiadId/1" children={<Anzan/>}/>
                <Route exact path="/olympiads/:sentOlympiadId/:taskOlympiadId/2" children={<Anzan/>}/>
                <Route exact path="/olympiads/:sentOlympiadId/:taskOlympiadId/3" children={<Anzan/>}/>
                <Route exact path="/olympiads/:sentOlympiadId/:taskOlympiadId/4" children={<Anzan/>}/>
                <Route exact path="/olympiads/:sentOlympiadId/:taskOlympiadId/6" children={<FlashAnzan/>}/>
                <Route exact path="/olympiads/:sentOlympiadId/:taskOlympiadId/23" children={<Anzan/>}/>
                <Route exact path="/olympiads/:sentOlympiadId/:taskOlympiadId/17" children={<SpecialAnzan/>}/>
                <Route exact path="/olympiads/:sentOlympiadId/:taskOlympiadId/18" children={<Anzan/>}/>
                <Route exact path="/olympiads/:sentOlympiadId/:taskOlympiadId/22" children={<Progression/>}/>
                <Route exact path="/olympiads/:sentOlympiadId/:taskOlympiadId/24" children={<CustomExercises/>}/>

                <Route exact path="/olympiads/:sentOlympiadId/:taskOlympiadId/15" children={<WordList/>}/>
                <Route exact path="/olympiads/:sentOlympiadId/:taskOlympiadId/10" children={<DigitalRow/>}/>
                <Route exact path="/olympiads/:sentOlympiadId/:taskOlympiadId/16" children={<Numbers/>}/>
                <Route exact path="/olympiads/:sentOlympiadId/:taskOlympiadId/8" children={<Personalities/>}/>
                <Route exact path="/olympiads/:sentOlympiadId/:taskOlympiadId/9" children={<Countries/>}/>
                <Route exact path="/olympiads/:sentOlympiadId/:taskOlympiadId/19" children={<DigitalPicture/>}/>
                <Route exact path="/olympiads/:sentOlympiadId/:taskOlympiadId/11" children={<MasterSystem/>}/>
            </Switch>
        </div>
    </Router>;
};

export default Tasks;