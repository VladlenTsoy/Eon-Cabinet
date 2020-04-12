import React, {useEffect, useState} from 'react';
import {Col, Row, Select} from "antd";
import ModeAnzan from "./ModeAnzan";
import {FormItem} from "../../../../../../../../layouts/components";
import {useSelector} from "react-redux";

const {Option} = Select;

interface HeaderSettingAdditionProps {
    form: any;
    isArray?: number;
    setting: any;
    isMultiplication: any;
    updateIsMultiplication: any;
}

const HeaderSettingAnzan: React.FC<HeaderSettingAdditionProps> = ({form, isArray, setting, isMultiplication, updateIsMultiplication}) => {
    const {language, app} = useSelector((state: any) => state);
    const [lengths, setLengths] = useState<any>([]);
    const [types, setTypes] = useState<any>([]);
    const [themes, setThemes] = useState<any>([]);
    const [isThemes, setIsThemes] = useState<boolean>(false);

    //
    useEffect(() => {
        try {
            const _lengths = Object.keys(
                app.algorithms[isArray ? setting['mode'][isArray] : setting['mode']]
            );
            setLengths(_lengths);

            const _types = Object.keys(
                app.algorithms[isArray ? setting['mode'][isArray] : setting['mode']][isArray ? setting['length'][isArray] : setting['length']]
            );
            setTypes(_types);

            const _themes = Object.keys(
                app.algorithms[isArray ? setting['mode'][isArray] : setting['mode']][isArray ? setting['length'][isArray] : setting['length']][isArray ? setting['type'][isArray] : setting['type']]
            );
            setThemes(_themes);

            if ((isArray ? setting['mode'][isArray] : setting['mode']) === 'divide' || (isArray ? setting['mode'][isArray] : setting['mode']) === 'multiply')
                setIsThemes((isArray ? setting['type'][isArray] : setting['type']) === 'o');
        } catch (e) {
            console.log(e);
        }
    }, [setting, app.algorithms, isArray]);

    // Change output length
    const changeModes = (arg: any) => {
        const value = arg.target ? arg.target.value : arg;
        (async () => {
            const _lengths = Object.keys(app.algorithms[value]);
            await updateIsMultiplication(value === 'divide' || value === 'multiply');
            setting.mode = value;

            await setLengths(_lengths);
            await changeLength(_lengths[0]);
            form.setFieldsValue({[isArray ? `length[${isArray}]` : `length`]: _lengths[0]});
        })();
        return value;
    };

    // Change output type
    const changeLength = (value: any) => {
        (async () => {
            const _types = Object.keys(app.algorithms[setting.mode][value]);
            setting.length = value;

            await setTypes(_types);
            changeType(_types[0]);
            form.setFieldsValue({[isArray ? `type[${isArray}]` : 'type']: _types[0]});
        })();
        return value;
    };

    // Change output theme
    const changeType = (value: any) => {
        (async () => {
            if (setting.mode === 'divide' || setting.mode === 'multiply')
                await setIsThemes(value === 'o');
            else {
                const _themes = Object.keys(app.algorithms[setting.mode][setting.length][value]);
                setting.type = value;

                await setThemes(_themes);
                form.setFieldsValue({[isArray ? `theme[${isArray}]` : 'theme']: _themes[0]});
            }
        })();
        return value;
    };

    return <Row  gutter={15}>
        <Col span={24}>
            <ModeAnzan form={form} isArray={isArray} changeModes={changeModes}/>
        </Col>
        <Col span={isMultiplication && !isThemes ? 12 : 8}>
            <FormItem
                name={isArray ? `length[${isArray}]` : `length`}
                label="Разряд чисел"
                requiredMsg="Выберите разряд чисел!"
                getValueFromEvent={changeLength}>
                <Select loading={!lengths.length}>
                    {lengths.length ? lengths.map((leng: any) =>
                        <Option
                            disabled={form.getFieldValue('anzan') === 'double' && Number(leng) > 7}
                            key={leng}
                            value={leng}>
                            {isMultiplication ? language.common.lengthNames[leng] : leng}
                        </Option>
                    ) : null}
                </Select>
            </FormItem>
        </Col>
        <Col span={isMultiplication && !isThemes ? 12 : 8}>
            <FormItem
                label={isMultiplication ? 'Второе число' : 'Режим'}
                name={isArray ? `type[${isArray}]` : 'type'}
                requiredMsg={isMultiplication ? 'Выберите режим!' : 'Выберите второе число!'}
                getValueFromEvent={changeType}>
                <Select loading={!types.length}>
                    {types.length ? types.map((type: any) =>
                        <Option key={type} value={type}>
                            {language.common.typeNames[isMultiplication ? 1 : 0][type]}
                        </Option>
                    ) : null}
                </Select>
            </FormItem>
        </Col>
        {!isMultiplication ?
            <Col span={8}>
                <FormItem
                    label="Под тема"
                    name={isArray ? `theme[${isArray}]` : 'theme'}
                    requiredMsg="Выберите под тему!">
                    <Select loading={!themes.length}>
                        {themes.length ? themes.map((theme: any) =>
                            <Option key={theme} value={theme}>
                                {language.common.themeNames[theme] || theme}
                            </Option>
                        ) : null}
                    </Select>
                </FormItem>
            </Col> :
            isThemes ?
                <Col span={8}>
                    <FormItem
                        name={isArray ? `theme[${isArray}]` : 'theme'}
                        label="Число"
                        requiredMsg="Введите число!"
                    />
                </Col> : null
        }
    </Row>;
};

export default HeaderSettingAnzan;