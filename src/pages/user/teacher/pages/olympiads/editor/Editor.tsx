import React from 'react';
import {useChangeActionNavbar} from "hooks/old/use-change-action-navbar.effect";
import StepsSetting from "./steps-setting/StepsSetting";

const EditorOlympiad = () => {
    useChangeActionNavbar({action: 'back'});

    return <>
        <StepsSetting/>
    </>;
};

export default EditorOlympiad;