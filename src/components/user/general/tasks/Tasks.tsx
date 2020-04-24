import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {appChangeActionNavbar} from "../../../../store/app/actions";
import {
    gameChangeCurrentTimes,
    gameChangeStats,
    gameChangeStatus,
} from "../../../../store/game/actions";
import Anzan from "./mental/anzan/Anzan";
import {totalsChange} from "../../../../store/tasks/totals/action";
import {settingChange} from "../../../../store/tasks/setting/action";
import {settingAnzan} from "../../../../store/tasks/setting/reducer";
// import MultiAnzan from "./mental/multi-anzan/MultiAnzan";
// import FlashAnzan from "./mental/flash-anzan/FlashAnzan";
// import SpecialAnzan from "./mental/special-anzan/SpecialAnzan";
// import Progression from "./mental/progression/Progression";
// import DigitalRow from "./mnemonics/digital-row/DigitalRow";
// import WordList from "./mnemonics/word-list/WordList";
// import Numbers from "./mnemonics/numbers/Numbers";
// import Personalities from "./mnemonics/personalities/Personalities";
// import DigitalImage from "./mnemonics/digital-image/DigitalImage";
// import MasterSystem from "./mnemonics/master-system/MasterSystem";
// import Countries from "./mnemonics/countries/Countries";
// import DigitalPicture from "./mnemonics/digital-picture/DigitalPicture";
// import CustomExercises from "./mental/custom-exercises/CustomExercises";

// export interface TotalProps {
//     exercise?: number[];
//     user?: number;
//     answer?: number;
//     result?: boolean;
// }
//
// export interface StatsProps {
//     all: number;
//     success: number;
// }

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
            dispatch(totalsChange([]));
            dispatch(gameChangeStats({all: 0, success: 0}));
            dispatch(gameChangeCurrentTimes(1));
        }
    }, [dispatch]);

    return <Router>
        <div style={{height: '100%'}}>
            <Switch>
                {/*<Route exact path="/training/1/1" children={<Anzan/>}/>*/}
                {/*<Route exact path="/training/1/2" children={<Anzan/>}/>*/}
                {/*<Route exact path="/training/1/3" children={<Anzan/>}/>*/}
                {/*<Route exact path="/training/1/4" children={<Anzan/>}/>*/}
                {/*<Route exact path="/training/1/6" children={<FlashAnzan/>}/>*/}
                <Route exact path="/training/1/23" children={<Anzan/>}/>
                {/*<Route exact path="/training/1/17" children={<SpecialAnzan/>}/>*/}

                {/*<Route exact path="/training/1/18" children={<Anzan/>}/>*/}

                {/*<Route exact path="/training/1/21" children={<MultiAnzan/>}/>*/}
                {/*<Route exact path="/training/1/22" children={<Progression/>}/>*/}
                {/*<Route exact path="/training/1/24" children={<CustomExercises/>}/>*/}
                {/*<Route exact path="/training/2/10" children={<DigitalRow/>}/>*/}
                {/*<Route exact path="/training/2/15" children={<WordList/>}/>*/}
                {/*<Route exact path="/training/2/16" children={<Numbers/>}/>*/}
                {/*<Route exact path="/training/2/8" children={<Personalities/>}/>*/}
                {/*<Route exact path="/training/2/13" children={<DigitalImage/>}/>*/}
                {/*<Route exact path="/training/2/11" children={<MasterSystem/>}/>*/}
                {/*<Route exact path="/training/2/9" children={<Countries/>}/>*/}
                {/*<Route exact path="/training/2/19" children={<DigitalPicture/>}/>*/}
            </Switch>
        </div>
    </Router>;
};

export default Tasks;