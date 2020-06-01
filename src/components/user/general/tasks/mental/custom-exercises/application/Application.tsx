import React from 'react';
import {useSelector} from "react-redux";
import {gameSelector} from "../../../../../../../store/reducers/common/game/gameSplice";
import ApplicationAnzan from "../../anzan/application/Application";
import {settingAnzan} from "../../../../../../../store/reducers/common/tasks/setting/reducer";

const Application = () => {
    const setting = useSelector(settingAnzan);
    const {currentTimes} = useSelector(gameSelector);

    return <ApplicationAnzan otherUrl={
        setting.type_task === 'list' ?
            `/custom-exercises/${setting.custom_exercises_id}` :
            `/custom-exercises/${setting.custom_exercises_id}?currentTimes=${currentTimes}`
    }/>
};

export default Application;