import React from 'react';
import {useApiUserGeneral} from "hooks/use-api-user-general.effect";
import {LoadingBlock} from "lib/components";
import FormSetting from "./forms/FormSetting";

interface CustomExercisesProps {
    isEdit?: boolean;
    userSetting?: any;
    clearSaveSetting?: any;
    startApplication?: (setting: any, print: boolean) => void;
    addSettingHomework?: (setting: any) => void;
}

const CustomExercises: React.FC<CustomExercisesProps> = (
    {
        isEdit,
        userSetting,
        clearSaveSetting,
        startApplication,
        addSettingHomework
    }
) => {
    const [loading, exercises] = useApiUserGeneral({url: '/teacher/custom-exercises/form'});

    return !loading ?
        <FormSetting
            exercises={exercises}
            userSetting={userSetting}
            isEdit={isEdit}
            clearSaveSetting={clearSaveSetting}
            startApplication={startApplication}
            addSettingHomework={addSettingHomework}
        /> :
        <LoadingBlock/>;
};

export default CustomExercises;