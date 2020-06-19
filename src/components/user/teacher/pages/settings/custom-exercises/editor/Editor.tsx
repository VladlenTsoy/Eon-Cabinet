import React, {useState} from 'react';
import Setup from "./setup/Setup";
import SettingExercises from "./setting-exercises/SettingExercises";
import {useChangeActionNavbar} from "../../../../../../../hooks/use-change-action-navbar.effect";

const Editor: React.FC = () => {
    const [setupSetting, setSetupSetting] = useState();

    useChangeActionNavbar({action: 'back'});

    return <>
        {
            setupSetting ?
                <SettingExercises setupSetting={setupSetting}/> :
                <Setup setSetupSetting={setSetupSetting}/>
        }
    </>;
};

export default Editor;