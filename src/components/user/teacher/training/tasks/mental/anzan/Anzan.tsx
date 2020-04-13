import React, {useCallback, useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import AnzanFormBody from "./anzan-form-body/AnzanFormBody";

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
        isEdit = false,
        userSetting,
        clearSaveSetting,
        startApplication,
        addSettingHomework,
    }
) => {
    const {app, user} = useSelector((state: any) => state);
    const [fields, setFields] = useState<any[]>([]);
    const [lengths, setLengths] = useState<any>([]);
    const [types, setTypes] = useState<any>([]);
    const [themes, setThemes] = useState<any>([]);

    const checkAlgorithms = useCallback(() => {
        return user.setting.is_custom_algorithms ? app.custom_algorithms : app.algorithms;
    }, [user.setting.is_custom_algorithms, app.custom_algorithms, app.algorithms]);

    /***
     * Обновление тем
     *
     * @param _fields       - Значения всех полей
     * @param changedFields - Измененные поля
     * @param modeValue     - Мод значение
     * @param lengthValue   - Разряд значение
     * @param typeValue     - Тип значение
     */
    const updateThemesByType = useCallback(
        (_fields, changedFields, modeValue = "plus", lengthValue = "1", typeValue = "p", user?) => {
            const _themes = Object.keys(checkAlgorithms()[modeValue][lengthValue][typeValue]);
            setThemes(_themes);

            let theme = user ? String(user.theme) : _themes[0];

            setFields(_fields.map((field: any) => {
                if (field.name.includes('mode'))
                    field.value = modeValue;
                else if (field.name.includes('length'))
                    field.value = lengthValue;
                else if (field.name.includes('type'))
                    field.value = typeValue;
                else if (field.name.includes('theme'))
                    field.value = theme;
                return field;
            }));
        },
        [checkAlgorithms]
    );

    /**
     * Обновление типов
     *
     * @param _fields       - Значения всех полей
     * @param changedFields - Измененные поля
     * @param modeValue     - Мод значение
     * @param lengthValue   - Разряд значение
     */
    const updateTypesByLength = useCallback(
        (_fields, changedFields, modeValue = "plus", lengthValue = "1", user?) => {
            const _types = Object.keys(checkAlgorithms()[modeValue][lengthValue]);
            setTypes(_types);

            let type = user ? String(user.type) : _types[0];
            // Обновление тем
            updateThemesByType(_fields, changedFields, modeValue, lengthValue, type, user);
        },
        [checkAlgorithms, updateThemesByType]
    );

    /**
     * Обновление разряда
     *
     * @param _fields       - Значения всех полей
     * @param changedFields - Измененные поля
     * @param modeValue     - Мод значение
     */
    const updateLengthsByMode = useCallback(
        (_fields, changedFields, modeValue = 'plus', user?) => {
            if (!checkAlgorithms().hasOwnProperty(modeValue))
                return false;

            const _lengths = Object.keys(checkAlgorithms()[modeValue]);
            setLengths(_lengths);

            let length = user ? String(user.length) : _lengths[0];
            // Обновление типов
            updateTypesByLength(_fields, changedFields, modeValue, length, user)
        },
        [checkAlgorithms, updateTypesByLength]
    );

    /**
     * Изменение формы настроки
     *
     * @param changedFields - Измененные поля
     * @param fieldsValue   - Значения всех полей
     */
    const handleFormChange = useCallback((changedFields: any[], allFields: any[]) => {
        let mode = allFields.find((field: any) => field.name.includes('mode'));
        let length = allFields.find((field: any) => field.name.includes('length'));

        return changedFields.map((field: any) => {
            if (field.name.includes('mode'))
                return updateLengthsByMode(
                    allFields,
                    changedFields,
                    field.value
                );
            else if (field.name.includes('length'))
                return updateTypesByLength(
                    allFields, changedFields,
                    mode.value,
                    field.value
                );
            else if (field.name.includes('type'))
                return updateThemesByType(
                    allFields,
                    changedFields,
                    mode.value,
                    length.value,
                    field.value
                );
            else
                return setFields(allFields);
        });
    }, [updateLengthsByMode, updateTypesByLength, updateThemesByType]);

    useEffect(() => {
        try {
            if (userSetting) {
                let _fields: any = [];
                for (let key in userSetting)
                    if (userSetting.hasOwnProperty(key))
                        _fields.push({name: [key], value: userSetting[key]});

                updateLengthsByMode(_fields, {}, userSetting.mode, userSetting);
                setFields(_fields);
            } else
                updateLengthsByMode({}, {}, !mods || mods === 'addition' ? 'plus' : 'multiply');
        } catch (e) {
            console.log(e);
        }
    }, [mods, userSetting, updateLengthsByMode]);

    return fields.length ?
        <AnzanFormBody
            initialValues={{
                mode: 'plus',
            }}
            isEdit={isEdit}
            mods={mods}
            isMultiAnzan={isMultiAnzan}
            onChange={handleFormChange}
            clearSaveSetting={clearSaveSetting}
            startApplication={startApplication}
            addSettingHomework={addSettingHomework}
            fields={fields}
            lengths={lengths}
            sound={sound}
            types={types}
            themes={themes}
        /> : null;
};

export default Anzan;