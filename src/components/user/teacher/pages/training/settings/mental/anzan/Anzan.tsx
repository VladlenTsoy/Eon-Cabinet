import React, {useCallback, useEffect, useState} from 'react';
import {Form} from "antd";
import HeaderForm from "./forms/header-form/HeaderForm";
import BodyForm from "./forms/body-form/BodyForm";
import TypeForm from "./forms/type-form/TypeForm";
import ActionForm from "./forms/action-form/ActionForm";

interface AnzanProps {
    mods?: string,
    sound?: boolean,
    isMultiAnzan?: boolean,
    isEdit?: boolean,
    userSetting?: any;
    clearSaveSetting?: any;
    startApplication?: (setting: any, print: boolean) => void;
    addSettingHomework?: (setting: any) => void;
}

/**
 *
 * @param mods                              - Какие моды отображать
 * @param sound                             - Звуки
 * @param multi                             - Если для Мульти-Анзана
 * @param isEdit                            -
 * @param userSetting                       - Сохраненные настройки пользователя
 * @param clearSaveSetting                  - Очистить настройки
 * @param startApplication                  - Начать упражнение и сохранить настройки пользователя
 * @param addSettingHomework                - Добавить к домашнему заданию
 * @constructor
 */
const Anzan: React.FC<AnzanProps> = (
    {
        mods,
        sound = true,
        isMultiAnzan = false,
        userSetting,
        isEdit = false,
        clearSaveSetting,
        startApplication,
        addSettingHomework,
    }
) => {
    const [isClearForm, setIsClearForm] = useState(false);
    const [initialValue, setInitialValue] = useState(userSetting);
    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState('plus');
    const [typeTask, setTypeTask] = useState(mods === 'addition' ? 'basic' : 'multiply');
    const [length, setLength] = useState('1');
    const [isMultiplication, setIsMultiplication] = useState(Boolean(mods && mods === 'multiplication'));

    const onFormChangeHandler = (formName: string, info: any) => {
        const {types, header} = info.forms;
        const mode = header.getFieldValue('mode');

        if (!isMultiAnzan)
            setTypeTask(types.getFieldValue('anzan'));
        setIsMultiplication(mode === 'divide' || mode === 'multiply');
        setMode(mode);
        setLength(header.getFieldValue('length'));
    };

    const onFormFinishHandler = async (formName: string, info: any) => {
        const {types, header, body, action} = info.forms;
        const typesValues = !isMultiAnzan ? types.getFieldsValue() : null;
        const headerValues = header.getFieldsValue();
        const bodyValues = body.getFieldsValue();
        const setting = {...typesValues, ...headerValues, ...bodyValues};
        const isPrint = action.getFieldValue('print');

        setLoading(true);

        if (startApplication)
            await startApplication(setting, isPrint);
        if (addSettingHomework)
            await addSettingHomework(setting);

        if (isPrint || addSettingHomework)
            setLoading(false);
    };

    const clearForms = useCallback(async () => {
        if (clearSaveSetting) {
            setLoading(true);
            setIsClearForm(true);
            setInitialValue({anzan: 'basic', mode: 'plus', length: '1'});
            await clearSaveSetting();
            setIsClearForm(false);
            setLoading(false);
        }
    }, [clearSaveSetting]);

    useEffect(() => {
        if (typeof initialValue === 'object' && Object.keys(initialValue).length) {
            setTypeTask(initialValue.anzan);
            setIsMultiplication(initialValue.mode === 'divide' || initialValue.mode === 'multiply');
            setLength(initialValue.length);
        }
    }, [initialValue]);

    return <Form.Provider
        onFormFinish={onFormFinishHandler}
        onFormChange={onFormChangeHandler}
    >
        {!isMultiAnzan ?
            <TypeForm
                isClearForm={isClearForm}
                initialValues={initialValue}
            /> : null
        }
        <HeaderForm
            isClearForm={isClearForm}
            mods={mods}
            initialValues={initialValue}
        />
        <BodyForm
            isClearForm={isClearForm}
            initialValues={initialValue}
            mods={mods}
            mode={mode}
            isMultiAnzan={isMultiAnzan}
            sound={sound}
            typeTask={typeTask}
            length={length}
            isMultiplication={isMultiplication}
        />
        <ActionForm
            isEdit={isEdit}
            loading={loading}
            clearForms={clearForms}
            typeTask={typeTask}
            addSettingHomework={addSettingHomework}
        />
    </Form.Provider>
};

export default Anzan;