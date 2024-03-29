import React from 'react';
import Basic from "./basic/Basic";
import List from "./list/List";

interface SettingExercisesProps {
    setupSetting: any;
}

const SettingExercises: React.FC<SettingExercisesProps> = ({setupSetting}) => {
    return <>
        {
            setupSetting.type_task === 'basic' ?
                <Basic setupSetting={setupSetting}/> :
                <List setupSetting={setupSetting}/>
        }
    </>;
};

export default SettingExercises;