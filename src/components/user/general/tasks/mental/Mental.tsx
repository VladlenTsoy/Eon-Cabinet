import React from 'react';
import {Switch} from "react-router";
import {Route} from "react-router-dom";
import Anzan from "./anzan/Anzan";
import FlashAnzan from "./flash-anzan/FlashAnzan";
import SpecialAnzan from "./special-anzan/SpecialAnzan";
import MultiAnzan from "./multi-anzan/MultiAnzan";
import Progression from "./progression/Progression";
import CustomExercises from "./custom-exercises/CustomExercises";

interface MentalProps {
    url: string;
}

const Mental:React.FC<MentalProps> = ({url}) => {
    return <Switch>
        <Route exact path={`${url}/1/1`} children={<Anzan/>}/>
        <Route exact path={`${url}/1/2`} children={<Anzan/>}/>
        <Route exact path={`${url}/1/3`} children={<Anzan/>}/>
        <Route exact path={`${url}/1/4`} children={<Anzan/>}/>
        <Route exact path={`${url}/1/6`} children={<FlashAnzan/>}/>
        <Route exact path={`${url}/1/17`} children={<SpecialAnzan/>}/>
        <Route exact path={`${url}/1/18`} children={<Anzan/>}/>
        <Route exact path={`${url}/1/21`} children={<MultiAnzan/>}/>
        <Route exact path={`${url}/1/22`} children={<Progression/>}/>
        <Route exact path={`${url}/1/23`} children={<Anzan/>}/>
        <Route exact path={`${url}/1/24`} children={<CustomExercises/>}/>
    </Switch>;
};

export default Mental;