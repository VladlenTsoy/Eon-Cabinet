import React from 'react';
import {useSelector} from "react-redux";
import {gameSelector} from "../../../../../../../store/common/game/gameSplice";
import ApplicationAnzan from "../../anzan/application/Application";

const Application = () => {
    const {setting} = useSelector(gameSelector);

    return <ApplicationAnzan otherUrl={`/custom-exercises/${setting.custom_exercises_id}`}/>
};

export default Application;