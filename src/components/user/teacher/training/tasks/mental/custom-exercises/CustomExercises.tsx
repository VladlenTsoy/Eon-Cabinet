import React, {useCallback, useEffect, useState} from 'react';
import {useApiUserGeneral} from "../../../../../../../effects/use-api-user-general.effect";
import {LoadingBlock} from "../../../../../../../lib";
import FormItems from "./form-items/FormItems";

interface CustomExercisesProps {
    userSetting?: any;
    clearSaveSetting?: any;
    startApplication?: (setting: any, print: boolean) => void;
    addSettingHomework?: (setting: any) => void;
}

const CustomExercises: React.FC<CustomExercisesProps> = (
    {
        userSetting,
        clearSaveSetting,
        startApplication,
        addSettingHomework
    }
) => {
    const [loading, exercises] = useApiUserGeneral({url: '/teacher/custom-exercises/form'});

    const [categories, setCategories] = useState<string[]>([]);
    const [typeTasks, setTypeTasks] = useState<string[]>([]);
    const [modes, setModes] = useState<string[]>([]);
    const [titles, setTitles] = useState<any[]>([]);

    const updateTitles = useCallback((allFields, categoryValue, typeTaskValue, modeValue, user?) => {
        let _titles = Object.values(exercises[categoryValue][typeTaskValue][modeValue]);
        let _title: any = _titles[0];
        let _titleValue = user ? user.custom_exercises_id : _title.id;
        setTitles(_titles);

        return allFields.map((field: any) => {
            if (field.name.includes('category_id'))
                field.value = categoryValue;
            else if (field.name.includes('anzan'))
                field.value = typeTaskValue;
            else if (field.name.includes('mode'))
                field.value = modeValue;
            else if (field.name.includes('custom_exercises_id'))
                field.value = _titleValue;
            return field;
        });
    }, [exercises]);

    const updateModes = useCallback((allFields, categoryValue, typeTaskValue, user?) => {
        let _modes = Object.keys(exercises[categoryValue][typeTaskValue]);
        let _mode = user ? user.mode : _modes[0];
        setModes(_modes);
        return updateTitles(allFields, categoryValue, typeTaskValue, _mode, user);
    }, [updateTitles, exercises]);

    const updateTypeTasks = useCallback((allFields, categoryValue, user?) => {
        let _typeTasks = Object.keys(exercises[categoryValue]);
        let _typeTask = user ? user.anzan : _typeTasks[0];
        setTypeTasks(_typeTasks);
        return updateModes(allFields, categoryValue, _typeTask, user);
    }, [updateModes, exercises]);

    const handleFormChange = useCallback((changedFields: any[], allFields: any[]) => {
        let category = allFields.find((field: any) => field.name.includes('category_id'));
        let typeTask = allFields.find((field: any) => field.name.includes('anzan'));

        if (changedFields.length) {
            return changedFields.map((field: any) => {
                if (field.name.includes('category_id'))
                    return updateTypeTasks(allFields, field.value);
                else if (field.name.includes('anzan'))
                    return updateModes(
                        allFields,
                        category.value,
                        field.value
                    );
                else if (field.name.includes('mode'))
                    return updateTitles(
                        allFields,
                        category.value,
                        typeTask.value,
                        field.value
                    );
                return allFields;
            })[0];
        } else
            return allFields
    }, [updateTypeTasks, updateModes, updateTitles]);

    useEffect(() => {
        if (typeof exercises === 'object') {
            let _categories = Object.keys(exercises);
            setCategories(_categories);
            // let _typeTasks = Object.keys(exercises[_categories[0]]);
            // let _modes = Object.keys(exercises[_categories[0]][_typeTasks[0]]);
            // let _titles = Object.values(exercises[_categories[0]][_typeTasks[0]][_modes[0]]);

            if (typeof userSetting === 'object' && Object.keys(userSetting).length) {
                let _fields = Object.keys(userSetting).map((key: string) => ({name: [key], value: userSetting[key]}));
                try {
                    updateTypeTasks(_fields, userSetting.category_id, userSetting);
                } catch (e) {
                }
            }
            // console.log(_categories, _typeTasks, _modes, _titles);
        }
    }, [exercises, updateTypeTasks, userSetting]);

    return !loading ?
        <FormItems
            initialValues={userSetting || {}}

            onChange={handleFormChange}
            categories={categories}
            typeTasks={typeTasks}
            modes={modes}
            titles={titles}

            clearSaveSetting={clearSaveSetting}
            startApplication={startApplication}
            addSettingHomework={addSettingHomework}
        /> :
        <LoadingBlock/>;
};

export default CustomExercises;