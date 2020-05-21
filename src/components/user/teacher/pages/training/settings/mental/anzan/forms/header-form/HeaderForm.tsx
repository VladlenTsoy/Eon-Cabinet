import React, {useCallback, useEffect, useState} from 'react';
import {Form} from "antd";
import {useSelector} from "react-redux";
import HeaderSetting from "./header-setting/HeaderSetting";

interface FormHeaderProps {
    isClearForm: boolean;
    mods?: string,
    initialValues: any,
}

const FormHeader: React.FC<FormHeaderProps> = (
    {
        isClearForm,
        mods,
        initialValues,
    }
) => {
    const [form] = Form.useForm();
    const {app} = useSelector((state: any) => state);
    const [fields, setFields] = useState<any[]>([]);

    const checkAlgorithms = useCallback(() => {
        return app.algorithms;
    }, [app.algorithms]);

    const [isMultiplication, setIsMultiplication] = useState(false);
    const [isThemes, setIsTheme] = useState(true);
    const [lengths, setLengths] = useState<any>([]);
    const [types, setTypes] = useState<any>([]);
    const [themes, setThemes] = useState<any>([]);

    let [initValue, setInitValue] = useState({
        mode: !mods || mods === 'addition' ? 'plus' : 'multiply',
        length: '1',
        type: !mods || mods === 'addition' ? 'p' : '1',
        theme: '1-4',
        ...initialValues
    });

    /***
     * Обновление тем
     *
     * @param allFields       - Значения всех полей
     * @param changedFields - Измененные поля
     * @param modeValue     - Мод значение
     * @param lengthValue   - Разряд значение
     * @param typeValue     - Тип значение
     */
    const updateThemesByType = useCallback(
        (allFields, modeValue = "plus", lengthValue = "1", typeValue = "p", user?) => {
            setIsTheme((modeValue === 'divide' || modeValue === 'multiply') && typeValue === 'o');

            const _themes = Object.keys(checkAlgorithms()[modeValue][lengthValue][typeValue]);
            setThemes(_themes);

            let theme = user ? String(user.theme) : _themes[0] || 'o';

            return allFields.map((field: any) => {
                if (field.name.includes('mode'))
                    field.value = modeValue;
                else if (field.name.includes('length'))
                    field.value = lengthValue;
                else if (field.name.includes('type'))
                    field.value = typeValue;
                else if (field.name.includes('theme'))
                    field.value = theme;
                return field;
            });
        },
        [checkAlgorithms]
    );

    /**
     * Обновление типов
     *
     * @param allFields       - Значения всех полей
     * @param changedFields - Измененные поля
     * @param modeValue     - Мод значение
     * @param lengthValue   - Разряд значение
     */
    const updateTypesByLength = useCallback(
        (allFields, modeValue = "plus", lengthValue = "1", user?) => {
            const _types = Object.keys(checkAlgorithms()[modeValue][lengthValue]);
            setTypes(_types);

            let type = user ? String(user.type) : _types[0];
            // Обновление тем
            return updateThemesByType(allFields, modeValue, lengthValue, type, user);
        },
        [checkAlgorithms, updateThemesByType]
    );

    /**
     * Обновление разряда
     *
     * @param allFields       - Значения всех полей
     * @param changedFields - Измененные поля
     * @param modeValue     - Мод значение
     */
    const updateLengthsByMode = useCallback(
        (allFields, modeValue = 'plus', user?) => {
            if (!checkAlgorithms().hasOwnProperty(modeValue))
                return false;

            setIsMultiplication(modeValue === 'divide' || modeValue === 'multiply');

            const _lengths = Object.keys(checkAlgorithms()[modeValue]);
            setLengths(_lengths);

            let length = user ? String(user.length) : _lengths[0];
            // Обновление типов
            return updateTypesByLength(allFields, modeValue, length, user)
        },
        [checkAlgorithms, updateTypesByLength]
    );

    /**
     * Изменение формы настроки
     *
     * @param changedFields - Измененные поля
     * @param allFields
     */
    const fieldsChange = (changedFields: any[], allFields: any[]) => {
        if (changedFields.length) {
            let mode = allFields.find((field: any) => field.name.includes('mode'));
            let length = allFields.find((field: any) => field.name.includes('length'));

            let updateFields = changedFields.map((field: any) => {
                if (field.name.includes('mode'))
                    return updateLengthsByMode(
                        allFields,
                        field.value,
                    );
                else if (field.name.includes('length'))
                    return updateTypesByLength(
                        allFields,
                        mode.value,
                        field.value
                    );
                else if (field.name.includes('type'))
                    return updateThemesByType(
                        allFields,
                        mode.value,
                        length.value,
                        field.value
                    );
                return allFields;
            })[0];

            setFields(updateFields);
        }
    };

    useEffect(() => {
        if (isClearForm)
            form.resetFields()
    }, [form, isClearForm]);

    useEffect(() => {
        setInitValue({
            mode: !mods || mods === 'addition' ? 'plus' : 'multiply',
            length: '1',
            type: !mods || mods === 'addition' ? 'p' : '1',
            theme: '1-4',
            ...initialValues
        })
    }, [mods, initialValues]);

    useEffect(() => {
        let _fields = Object.keys(initValue).map(
            (key: string) => ({name: [key], value: initValue[key]})
        );
        updateLengthsByMode(_fields, initValue.mode, initValue);
    }, [updateLengthsByMode, initValue]);

    return <Form
        name="header"
        form={form}
        initialValues={initValue}
        fields={fields}
        layout='vertical'
        onFieldsChange={fieldsChange}
    >
        <HeaderSetting
            form={form}
            mods={mods}
            lengths={lengths}
            types={types}
            themes={themes}
            isThemes={isThemes}
            isMultiplication={isMultiplication}
        />
    </Form>;
};

export default React.memo(FormHeader);