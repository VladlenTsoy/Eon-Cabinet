import React, {useCallback, useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {mergeDeep} from "../../../../../../../tools/merge-deep.tool";
import {Col, Row} from "antd";
import EditorForm from "./form/EditorForm";
import {Alert} from "../../../../../../../layouts/components";

interface StepSettingProps {
    settingSave: (setting: any) => void;
}

const StepSetting:React.FC<StepSettingProps> = ({settingSave}) => {
    const {app} = useSelector((state: any) => state);
    const [fields, setFields] = useState<any>({});
    const [lengths, setLengths] = useState<any>([]);
    const [types, setTypes] = useState<any>([]);
    const [themes, setThemes] = useState<any>([]);

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
            const _themes = Object.keys(app.algorithms[modeValue][lengthValue][typeValue]);
            setThemes(_themes);

            let theme = user ? String(user.theme) : _themes[0];
            setFields(mergeDeep(_fields, changedFields,
                {
                    mode: {value: modeValue},
                    length: {value: lengthValue},
                    type: {value: typeValue},
                    theme: {value: theme},
                }
            ));
        },
        [app.algorithms]
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
            const _types = Object.keys(app.algorithms[modeValue][lengthValue]);
            setTypes(_types);

            let type = user ? String(user.type) : _types[0];
            // Обновление тем
            updateThemesByType(_fields, changedFields, modeValue, lengthValue, type, user);
        },
        [app.algorithms, updateThemesByType]
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
            const _lengths = Object.keys(app.algorithms[modeValue]);
            setLengths(_lengths);

            let length = user ? String(user.length) : _lengths[0];
            // Обновление типов
            updateTypesByLength(_fields, changedFields, modeValue, length, user)
        },
        [app.algorithms, updateTypesByLength]
    );

    /**
     * Изменение формы настроки
     *
     * @param changedFields - Измененные поля
     * @param fieldsValue   - Значения всех полей
     */
    const handleFormChange = useCallback((changedFields: any, fieldsValue: any) => {
        if (changedFields.mode)
            updateLengthsByMode(fieldsValue, changedFields, changedFields.mode.value);
        else if (changedFields.length)
            updateTypesByLength(fieldsValue, changedFields, fieldsValue.mode.value, changedFields.length.value);
        else if (changedFields.type)
            updateThemesByType(fieldsValue, changedFields, fieldsValue.mode.value, fieldsValue.length.value, changedFields.type.value);
        else
            setFields({...fieldsValue, ...changedFields})
    }, [updateLengthsByMode, updateTypesByLength, updateThemesByType]);

    useEffect(() => {
        try {
            updateLengthsByMode({}, {}, 'plus');
        } catch (e) {
            console.log(e);
        }
    }, [updateLengthsByMode]);

    return <Row  justify="center">
        <Col xl={14}>
            <Alert type="info" message="Выберите в какую категорию вы хотите добавить алгоритмы." description=" " showIcon/>
            <EditorForm
                onChange={handleFormChange}
                settingSave={settingSave}
                setting={fields}
                lengths={lengths}
                types={types}
                themes={themes}
            />
        </Col>
    </Row>;
};

export default StepSetting;