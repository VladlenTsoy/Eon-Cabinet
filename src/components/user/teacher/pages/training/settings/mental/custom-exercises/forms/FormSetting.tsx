import React, {useCallback, useEffect, useState} from 'react';
import {Form} from "antd";
import FormItems from "./form-items/FormItems";
import FromAction from "./form-action/FromAction";

interface FormSettingProps {
    userSetting: any,
    exercises: any,
    isEdit?: boolean,
    clearSaveSetting?: any;
    startApplication?: (setting: any, print: boolean) => void;
    addSettingHomework?: (setting: any) => void;
}

const FormSetting: React.FC<FormSettingProps> = (
    {
        exercises,
        userSetting,
        isEdit,
        clearSaveSetting,
        startApplication,
        addSettingHomework,
    }
) => {
    const [initialValues] = useState({time: 1, extra: [], sound: 'none'});
    const [initValues, setInitValues] = useState({...initialValues, ...userSetting});
    const [form] = Form.useForm();
    const [fields, setFields] = useState<any[]>([]);
    const [description, setDescription] = useState('');
    const [data, setData] = useState<any>({
        categories: [],
        modes: [],
        typeTasks: [],
        titles: [],
        typeTask: 'basic',
        mode: 'plus-minus',
    });

    const clearFormSetting = useCallback(async () => {
        await setInitValues(initialValues);
        await setFields([]);
        await setData({categories: [], modes: [], typeTasks: [], titles: [], typeTask: 'basic', mode: 'plus-minus'});
        await clearSaveSetting();
        form.resetFields();
    }, [form, clearSaveSetting, initialValues]);

    const [categories] = useState<any>(typeof exercises === 'object' ? Object.keys(exercises) : []);

    const onChangeHandler = useCallback((item: any, select: any) => {
        setDescription(select['data-description']);
    }, []);

    const updateTitles = useCallback(({allFields, categories, category, typeTask, mode, typeTasks, modes, user = false}) => {
        if (!category || !typeTask || !mode) return false;
        let titles = Object.values(exercises[category][typeTask][mode]);
        let title: any = titles[0];
        let titleValue = user ? user.custom_exercises_id : title.id;

        setDescription(title.description);

        setFields(allFields.map((field: any) => {
            if (field.name.includes('category_id'))
                field.value = category;
            else if (field.name.includes('anzan'))
                field.value = typeTask;
            else if (field.name.includes('mode'))
                field.value = mode;
            else if (field.name.includes('custom_exercises_id'))
                field.value = titleValue;
            return field;
        }));

        return {categories, typeTasks, modes, titles, typeTask, mode}
    }, [exercises]);

    const updateModes = useCallback(({allFields, categories, category, typeTask, typeTasks, user = false}) => {
        if (!category || !typeTask) return false;
        let modes = Object.keys(exercises[category][typeTask]);
        let mode = user ? user.mode : modes[0];
        return updateTitles({allFields, categories, category, typeTask, mode, typeTasks, modes, user});
    }, [updateTitles, exercises]);

    const updateTypeTasks = useCallback(({allFields, categories, category, user = false,}) => {
        if (!category) return false;
        let typeTasks = Object.keys(exercises[category]);
        let typeTask = user ? user.anzan : typeTasks[0];
        return updateModes({allFields, categories, category, typeTask, typeTasks, user});
    }, [updateModes, exercises]);

    const handleFormChange = (changedFields: any[], allFields: any[]) => {
        if (changedFields.length) {
            let isError = changedFields.filter((field: any) => field.errors.length);
            if (isError.length)
                return false;

            let changeField = changedFields[0];
            if (fields.length) {
                let selectFields = fields.find((field: any) => field.name.includes(changeField.name[0]));
                if (changeField.value === selectFields?.value)
                    return false;
            }

            let category = allFields.find((field: any) => field.name.includes('category_id'));
            let typeTask = allFields.find((field: any) => field.name.includes('anzan'));

            setData((prevState: any) => {
                let stats = prevState;
                if (changedFields[0].name.includes('category_id'))
                    stats = updateTypeTasks({
                        allFields,
                        categories: [],
                        category: changedFields[0].value,
                    });
                else if (changedFields[0].name.includes('anzan'))
                    stats = updateModes({
                        allFields,
                        categories: [],
                        category: category.value,
                        typeTask: changedFields[0].value,
                        typeTasks: prevState.typeTasks,
                    });
                else if (changedFields[0].name.includes('mode'))
                    stats = updateTitles({
                        allFields,
                        categories: [],
                        category: category.value,
                        typeTask: typeTask.value,
                        mode: changedFields[0].value,
                        typeTasks: prevState.typeTasks,
                        modes: prevState.modes,
                    });
                return stats;
            });
        }
    };

    useEffect(() => {
        if (initValues.hasOwnProperty('category_id')) {
            let setting = updateTypeTasks({
                allFields: [], categories, category: initValues.category_id, user: initValues
            });
            if (setting)
                setData(setting);
        }
    }, [initValues, categories, updateTypeTasks]);

    return <Form
        form={form}
        layout="vertical"
        initialValues={initValues}
        fields={fields}
        onFieldsChange={handleFormChange}
    >
        <FormItems
            data={data}
            categories={categories}
            onChangeHandler={onChangeHandler}
            description={description}
        />
        <FromAction
            form={form}
            isEdit={isEdit}
            titles={data.titles}
            startApplication={startApplication}
            addSettingHomework={addSettingHomework}
            clearFormSetting={clearFormSetting}
        />
    </Form>;
};

export default React.memo(FormSetting);