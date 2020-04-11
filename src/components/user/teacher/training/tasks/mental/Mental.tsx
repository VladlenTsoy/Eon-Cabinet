import React from 'react';
import {Switch, Route} from "react-router";
import Anzan from "./anzan/Anzan";
import MultiAnzan from "./multi-anzan/MultiAnzan";
import Progression from "./progression/Progression";
import Flash from "./flash-anzan/Flash";
import Special from "./special-anzan/Special";

interface MentalProps {
    setting: any;
    clearSaveSetting: () => void;
    startOrPrintAndSaveSetting: (setting: any, print?: boolean) => void;
}

const Mental: React.FC<MentalProps> = ({setting, clearSaveSetting, startOrPrintAndSaveSetting}) => {
    return <Switch>
        <Route
            exact
            path="/training/1/23/setting"
            children={
                <Anzan
                    userSetting={setting}
                    clearSaveSetting={clearSaveSetting}
                    startApplication={startOrPrintAndSaveSetting}
                />
            }/>
        <Route
            exact
            path="/training/1/21/setting"
            children={
                <MultiAnzan
                    userSetting={setting}
                    clearSaveSetting={clearSaveSetting}
                    startApplication={startOrPrintAndSaveSetting}
                />
            }/>
        <Route
            exact
            path="/training/1/22/setting"
            children={
                <Progression
                    userSetting={setting}
                    clearSaveSetting={clearSaveSetting}
                    startApplication={startOrPrintAndSaveSetting}
                />
            }/>
        <Route
            exact
            path="/training/1/6/setting"
            children={
                <Flash
                    userSetting={setting}
                    clearSaveSetting={clearSaveSetting}
                    startApplication={startOrPrintAndSaveSetting}
                />
            }/>
        <Route
            exact
            path="/training/1/17/setting"
            children={
                <Special
                    userSetting={setting}
                    clearSaveSetting={clearSaveSetting}
                    startApplication={startOrPrintAndSaveSetting}
                />
            }/>
    </Switch>;
};

export default Mental;