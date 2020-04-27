import React from 'react';
import {Route, Switch} from "react-router-dom";
import WordList from "./word-list/WordList";
import DigitalRow from "./digital-row/DigitalRow";
import Numbers from "./numbers/Numbers";
import Personalities from "./personalities/Personalities";
import Countries from "./countries/Countries";
import DigitalPicture from "./digital-picture/DigitalPicture";
import MasterSystem from "./master-system/MasterSystem";

const Mnemonics = () => {
    return <Switch>
        <Route exact path="/olympiads/:disciplineId/:sentOlympiadId/:taskOlympiadId/15" children={<WordList/>}/>
        <Route exact path="/olympiads/:disciplineId/:sentOlympiadId/:taskOlympiadId/10" children={<DigitalRow/>}/>
        <Route exact path="/olympiads/:disciplineId/:sentOlympiadId/:taskOlympiadId/16" children={<Numbers/>}/>
        <Route exact path="/olympiads/:disciplineId/:sentOlympiadId/:taskOlympiadId/8" children={<Personalities/>}/>
        <Route exact path="/olympiads/:disciplineId/:sentOlympiadId/:taskOlympiadId/9" children={<Countries/>}/>
        <Route exact path="/olympiads/:disciplineId/:sentOlympiadId/:taskOlympiadId/19" children={<DigitalPicture/>}/>
        <Route exact path="/olympiads/:disciplineId/:sentOlympiadId/:taskOlympiadId/11" children={<MasterSystem/>}/>
    </Switch>;
};

export default Mnemonics;