import React from 'react';
import {Route, Switch} from "react-router";
import WordList from "./word-list/WordList";
import DigitalRow from "./digital-row/DigitalRow";
import Numbers from "./numbers/Numbers";
import Personalities from "./personalities/Personalities";
import DigitalImage from "./digital-image/DigitalImage";
import MasterSystem from "./master-system/MasterSystem";
import Countries from "./countries/Countries";
import DayOfWeek from "./day-of-week/DayOfWeek";
import DigitalPicture from "./digital-picture/DigitalPicture";

interface MnemonicsProps {
    setting: any;
    clearSaveSetting: () => void;
    startOrPrintAndSaveSetting: (setting: any, print?: boolean) => void;
}

const Mnemonics: React.FC<MnemonicsProps> = ({setting, clearSaveSetting, startOrPrintAndSaveSetting}) => {
    return <Switch>
        <Route
            exact
            path="/training/2/15/setting"
            children={
                <WordList
                    userSetting={setting}
                    clearSaveSetting={clearSaveSetting}
                    startApplication={startOrPrintAndSaveSetting}
                />
            }/>
        <Route
            exact
            path="/training/2/10/setting"
            children={
                <DigitalRow
                    userSetting={setting}
                    clearSaveSetting={clearSaveSetting}
                    startApplication={startOrPrintAndSaveSetting}
                />
            }/>
        <Route
            exact
            path="/training/2/16/setting"
            children={
                <Numbers
                    userSetting={setting}
                    clearSaveSetting={clearSaveSetting}
                    startApplication={startOrPrintAndSaveSetting}
                />
            }/>
        <Route
            exact
            path="/training/2/8/setting"
            children={
                <Personalities
                    userSetting={setting}
                    clearSaveSetting={clearSaveSetting}
                    startApplication={startOrPrintAndSaveSetting}
                />
            }/>
        <Route
            exact
            path="/training/2/13/setting"
            children={
                <DigitalImage
                    userSetting={setting}
                    clearSaveSetting={clearSaveSetting}
                    startApplication={startOrPrintAndSaveSetting}
                />
            }/>
        <Route
            exact
            path="/training/2/11/setting"
            children={
                <MasterSystem
                    userSetting={setting}
                    clearSaveSetting={clearSaveSetting}
                    startApplication={startOrPrintAndSaveSetting}
                />
            }/>
        <Route
            exact
            path="/training/2/9/setting"
            children={
                <Countries
                    userSetting={setting}
                    clearSaveSetting={clearSaveSetting}
                    startApplication={startOrPrintAndSaveSetting}
                />
            }/>
        <Route
            exact
            path="/training/2/14/setting"
            children={
                <DayOfWeek/>
            }/>
        <Route
            exact
            path="/training/2/19/setting"
            children={
                <DigitalPicture
                    userSetting={setting}
                    clearSaveSetting={clearSaveSetting}
                    startApplication={startOrPrintAndSaveSetting}
                />
            }/>
    </Switch>;
};

export default Mnemonics;