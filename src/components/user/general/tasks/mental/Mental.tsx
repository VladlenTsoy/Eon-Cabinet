import React from 'react';
import {Switch} from "react-router";
import {Route} from "react-router-dom";
import Anzan from "./anzan/Anzan";
import FlashAnzan from "./flash-anzan/FlashAnzan";
import SpecialAnzan from "./special-anzan/SpecialAnzan";
import MultiAnzan from "./multi-anzan/MultiAnzan";
import Progression from "./progression/Progression";
import CustomExercises from "./custom-exercises/CustomExercises";

const Mental = () => {
    return <Switch>
        <Route exact path="/training/1/1" children={<Anzan/>}/>
        <Route exact path="/training/1/2" children={<Anzan/>}/>
        <Route exact path="/training/1/3" children={<Anzan/>}/>
        <Route exact path="/training/1/4" children={<Anzan/>}/>
        <Route exact path="/training/1/6" children={<FlashAnzan/>}/>
        <Route exact path="/training/1/17" children={<SpecialAnzan/>}/>
        <Route exact path="/training/1/18" children={<Anzan/>}/>
        <Route exact path="/training/1/21" children={<MultiAnzan/>}/>
        <Route exact path="/training/1/22" children={<Progression/>}/>
        <Route exact path="/training/1/23" children={<Anzan/>}/>
        <Route exact path="/training/1/24" children={<CustomExercises/>}/>
    </Switch>;
};

export default Mental;