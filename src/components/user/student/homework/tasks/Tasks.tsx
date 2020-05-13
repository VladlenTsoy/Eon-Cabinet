import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {
    gameChangeCurrentTimes,
    gameChangeStats,
    gameChangeStatus,
} from "../../../../../store/game/actions";
import {BrowserRouter as Router, Route, Switch, RouteComponentProps} from "react-router-dom";
import Anzan from "../../../general/tasks/mental/anzan/Anzan";
import FlashAnzan from "../../../general/tasks/mental/flash-anzan/FlashAnzan";
import SpecialAnzan from "../../../general/tasks/mental/special-anzan/SpecialAnzan";
import MultiAnzan from "../../../general/tasks/mental/multi-anzan/MultiAnzan";
import Progression from "../../../general/tasks/mental/progression/Progression";
import DigitalRow from "../../../general/tasks/mnemonics/digital-row/DigitalRow";
import WordList from "../../../general/tasks/mnemonics/word-list/WordList";
import {useChangeActionNavbar} from "../../../../../effects/use-change-action-navbar.effect";
import Numbers from "../../../general/tasks/mnemonics/numbers/Numbers";
import Personalities from "../../../general/tasks/mnemonics/personalities/Personalities";
import Countries from "../../../general/tasks/mnemonics/countries/Countries";
import DigitalPicture from "../../../general/tasks/mnemonics/digital-picture/DigitalPicture";
import MasterSystem from "../../../general/tasks/mnemonics/master-system/MasterSystem";
import CustomExercises from "../../../general/tasks/mental/custom-exercises/CustomExercises";
import {settingChange} from "../../../../../store/tasks/setting/action";
import {totalsChange} from "../../../../../store/tasks/totals/action";
import {settingAnzan} from "../../../../../store/tasks/setting/reducer";

interface MatchProps {
    homeworkId: string;
}

type TasksProps = RouteComponentProps<MatchProps>;

const Tasks: React.FC<TasksProps> = ({history, match}) => {
    const setting = useSelector(settingAnzan);
    const {homeworkId} = match.params;

    const dispatch = useDispatch();

    if (!setting)
        history.push(`/homework/${homeworkId}`);

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

    return <Router>
        <div style={{height: '100%'}}>
            <Switch>
                <Route exact path="/homework/:homeworkId/:id/1" children={<Anzan/>}/>
                <Route exact path="/homework/:homeworkId/:id/2" children={<Anzan/>}/>
                <Route exact path="/homework/:homeworkId/:id/3" children={<Anzan/>}/>
                <Route exact path="/homework/:homeworkId/:id/4" children={<Anzan/>}/>
                <Route exact path="/homework/:homeworkId/:id/6" children={<FlashAnzan/>}/>
                <Route exact path="/homework/:homeworkId/:id/23" children={<Anzan/>}/>
                <Route exact path="/homework/:homeworkId/:id/17" children={<SpecialAnzan/>}/>
                <Route exact path="/homework/:homeworkId/:id/18" children={<Anzan/>}/>
                <Route exact path="/homework/:homeworkId/:id/21" children={<MultiAnzan/>}/>
                <Route exact path="/homework/:homeworkId/:id/22" children={<Progression/>}/>
                <Route exact path="/homework/:homeworkId/:id/24" children={<CustomExercises/>}/>

                <Route exact path="/homework/:homeworkId/:id/15" children={<WordList/>}/>
                <Route exact path="/homework/:homeworkId/:id/10" children={<DigitalRow/>}/>
                <Route exact path="/homework/:homeworkId/:id/16" children={<Numbers/>}/>
                <Route exact path="/homework/:homeworkId/:id/8" children={<Personalities/>}/>
                <Route exact path="/homework/:homeworkId/:id/9" children={<Countries/>}/>
                <Route exact path="/homework/:homeworkId/:id/19" children={<DigitalPicture/>}/>
                <Route exact path="/homework/:homeworkId/:id/11" children={<MasterSystem/>}/>
            </Switch>
        </div>
    </Router>;
};

export default Tasks;