import React, {useState} from 'react';
import Disciplines from "./disciplines/Disciplines";
import StepsSetting from "./steps-setting/StepsSetting";
import {useChangeActionNavbar} from "effects/use-change-action-navbar.effect";

const EditorOlympiad = () => {
    const [discipline, setDiscipline] = useState<number>();

    useChangeActionNavbar({action: 'back'});

    if (!discipline)
        return <Disciplines setDiscipline={setDiscipline}/>;

    return <>
        <StepsSetting discipline={discipline}/>
    </>;
};

export default EditorOlympiad;