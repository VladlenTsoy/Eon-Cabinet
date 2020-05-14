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
        <Route exact path={`${url}/:disciplineId/:taskId`} params={{disciplineId: 1, taskId: 1}} children={<Anzan/>}/>
        <Route exact path={`${url}/:disciplineId/:taskId`} params={{disciplineId: 1, taskId: 2}} children={<Anzan/>}/>
        <Route exact path={`${url}/:disciplineId/:taskId`} params={{disciplineId: 1, taskId: 3}} children={<Anzan/>}/>
        <Route exact path={`${url}/:disciplineId/:taskId`} params={{disciplineId: 1, taskId: 4}} children={<Anzan/>}/>
        <Route exact path={`${url}/:disciplineId/:taskId`} params={{disciplineId: 1, taskId: 6}} children={<FlashAnzan/>}/>
        <Route exact path={`${url}/:disciplineId/:taskId`} params={{disciplineId: 1, taskId: 17}} children={<SpecialAnzan/>}/>
        <Route exact path={`${url}/:disciplineId/:taskId`} params={{disciplineId: 1, taskId: 18}} children={<Anzan/>}/>
        <Route exact path={`${url}/:disciplineId/:taskId`} params={{disciplineId: 1, taskId: 21}} children={<MultiAnzan/>}/>
        <Route exact path={`${url}/:disciplineId/:taskId`} params={{disciplineId: 1, taskId: 22}} children={<Progression/>}/>
        <Route exact path={`${url}/:disciplineId/:taskId`} params={{disciplineId: 1, taskId: 23}} children={<Anzan/>}/>
        <Route exact path={`${url}/:disciplineId/:taskId`} params={{disciplineId: 1, taskId: 24}} children={<CustomExercises/>}/>
    </Switch>;
};

export default Mental;