import React, {useEffect, useState} from 'react';
import {Col, Row, Select} from "antd";
import ModeAnzan from "../../../layout/header-setting-anzan/ModeAnzan";
import {FormItem} from "../../../../../../../../../layouts/components";
import {useSelector} from "react-redux";

const {Option} = Select;

interface HeaderSettingAdditionProps {
    typeAnzan: string;
    mods?: string;
    isMultiplication: boolean;
    forceDefaultAlgorithms?: boolean;
    setting: any;
    lengths: any;
    types: any;
    themes: any;
}

const HeaderSettingAnzan: React.FC<HeaderSettingAdditionProps> = (
    {
        typeAnzan,
        mods,
        setting,
        lengths,
        types,
        themes,
        isMultiplication,
        forceDefaultAlgorithms
    }
) => {
    const {language, app} = useSelector((state: any) => state);
    const [isThemes, setIsThemes] = useState<boolean>(false);

    //
    useEffect(() => {
        try {
            if (setting.mode.value === 'divide' || setting.mode.value === 'multiply')
                setIsThemes(setting.type.value === 'o');
        } catch (e) {
            // console.log(e);
        }
    }, [setting, app.algorithms]);

    return <Row  gutter={15}>
        <Col span={24}>
            <ModeAnzan
                forceDefaultAlgorithms={forceDefaultAlgorithms}
                mods={mods}
            />
        </Col>
        <Col sm={isMultiplication && !isThemes ? 12 : 8} xs={12}>
            <FormItem
                name={`length`}
                label="Разряд чисел"
                requiredMsg="Выберите разряд чисел!"
            >
                <Select loading={!lengths.length}>
                    {lengths.length ? lengths.map((leng: any) =>
                        <Option
                            disabled={typeAnzan === 'double' && Number(leng) > 7}
                            key={leng}
                            value={leng}>
                            {isMultiplication ? language.common.lengthNames[leng] : leng}
                        </Option>
                    ) : null}
                </Select>
            </FormItem>
        </Col>
        <Col sm={isMultiplication && !isThemes ? 12 : 8} xs={12}>
            <FormItem
                label={isMultiplication ? 'Второе число' : 'Режим'}
                name={'type'}
                requiredMsg={isMultiplication ? 'Выберите режим!' : 'Выберите второе число!'}
            >
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
            <Col sm={8} xs={24}>
                <FormItem
                    label="Под тема"
                    name={'theme'}
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
                <Col sm={8} xs={24}>
                    <FormItem
                        name={'theme'}
                        label="Число"
                        requiredMsg="Введите число!"
                    />
                </Col> : null
        }
    </Row>;
};

export default HeaderSettingAnzan;