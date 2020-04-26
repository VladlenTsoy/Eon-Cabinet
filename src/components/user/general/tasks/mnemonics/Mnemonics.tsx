import React from 'react';
import {Switch} from "react-router";
import {Route} from "react-router-dom";
import DigitalRow from "./digital-row/DigitalRow";
import WordList from "./word-list/WordList";
import Numbers from "./numbers/Numbers";
import Personalities from "./personalities/Personalities";
import DigitalImage from "./digital-image/DigitalImage";
import MasterSystem from "./master-system/MasterSystem";
import Countries from "./countries/Countries";
import DigitalPicture from "./digital-picture/DigitalPicture";

const Mnemonics = () => {
    return <Switch>
        <Route exact path="/training/2/10" children={<DigitalRow/>}/>
        <Route exact path="/training/2/15" children={<WordList/>}/>
        <Route exact path="/training/2/16" children={<Numbers/>}/>
        <Route exact path="/training/2/8" children={<Personalities/>}/>
        <Route exact path="/training/2/13" children={<DigitalImage/>}/>
        <Route exact path="/training/2/11" children={<MasterSystem/>}/>
        <Route exact path="/training/2/9" children={<Countries/>}/>
        <Route exact path="/training/2/19" children={<DigitalPicture/>}/>
    </Switch>;
};

export default Mnemonics;