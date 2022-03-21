import React, {useEffect} from 'react';
import {LoadingBlock} from "lib/ui";
import FormSetting from "./forms/FormSetting";
import {useSelector} from "react-redux";
import {customExercisesSelector} from "store/custom-exercises/customExercisesSlice";
import {fetchCustomExercises} from "store/custom-exercises/fetchCustomExercises";
import {useDispatch} from "store/store";

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
    const {loading, exercises} = useSelector(customExercisesSelector)
    const dispatch = useDispatch()

    useEffect(() => {
        const promise = dispatch(fetchCustomExercises())
        return () => {
            promise.abort()
        }
    }, [dispatch])

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
