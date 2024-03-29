import React from 'react';
import {Col, Select} from "antd";
import {FormItem} from "../../../../../../../../../../../../lib";
import {useAppContext} from "store/context/use-app-context";

const {Option} = Select;

interface SelectThemeProps {
    themes: any[];
    isMultiplication: boolean;
    isThemes: boolean;
}

const SelectTheme: React.FC<SelectThemeProps> = (
    {
        themes,
        isMultiplication,
        isThemes
    }
) => {
    const {language} = useAppContext();

    return <>
        {!isMultiplication ?
            <Col sm={8} xs={24}>
                <FormItem
                    label="Под тема"
                    name={'theme'}
                    dependencies={['mode']}
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
    </>;
};

export default React.memo(SelectTheme);