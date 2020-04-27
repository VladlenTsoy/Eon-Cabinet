import React from 'react';
import {Switch} from "react-router-dom";
import {Route} from "react-router-dom";
import Anzan from "./anzan/Anzan";
import FlashAnzan from "./flash-anzan/FlashAnzan";
import SpecialAnzan from "./special-anzan/SpecialAnzan";
import Progression from "./progression/Progression";
import CustomExercises from "./custom-exercises/CustomExercises";

const Mental = () => {
    return <Switch>
        <Route exact path="/olympiads/:disciplineId/:sentOlympiadId/:taskOlympiadId/1" children={<Anzan/>}/>
        <Route exact path="/olympiads/:disciplineId/:sentOlympiadId/:taskOlympiadId/2" children={<Anzan/>}/>
        <Route exact path="/olympiads/:disciplineId/:sentOlympiadId/:taskOlympiadId/3" children={<Anzan/>}/>
        <Route exact path="/olympiads/:disciplineId/:sentOlympiadId/:taskOlympiadId/4" children={<Anzan/>}/>
        <Route exact path="/olympiads/:disciplineId/:sentOlympiadId/:taskOlympiadId/6" children={<FlashAnzan/>}/>
        <Route exact path="/olympiads/:disciplineId/:sentOlympiadId/:taskOlympiadId/23" children={<Anzan/>}/>
        <Route exact path="/olympiads/:disciplineId/:sentOlympiadId/:taskOlympiadId/17" children={<SpecialAnzan/>}/>
        <Route exact path="/olympiads/:disciplineId/:sentOlympiadId/:taskOlympiadId/18" children={<Anzan/>}/>
        <Route exact path="/olympiads/:disciplineId/:sentOlympiadId/:taskOlympiadId/22" children={<Progression/>}/>
        <Route exact path="/olympiads/:disciplineId/:sentOlympiadId/:taskOlympiadId/24" children={<CustomExercises/>}/>
    </Switch>;
};

export default Mental;