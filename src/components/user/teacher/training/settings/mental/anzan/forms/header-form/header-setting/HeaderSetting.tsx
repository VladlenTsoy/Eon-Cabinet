import React from 'react';
import {Col, Row} from "antd";
import {FormInstance} from "antd/es/form";
import RadioMode from "./radio-mode/RadioMode";
import SelectLength from "./select-length/SelectLength";
import SelectType from "./select-type/SelectType";
import SelectTheme from "./select-theme/SelectTheme";

interface HeaderSettingProps {
    form: FormInstance;
    isMultiplication: boolean;
    isThemes: boolean;
    lengths: any;
    types: any;
    themes: any;
    mods?: string;
}

const HeaderSetting: React.FC<HeaderSettingProps> = (
    {
        mods,
        lengths,
        types,
        themes,
        form,
        isMultiplication,
        isThemes,
    }
) => {
    const typeAnzan = form.getFieldValue('anzan');

    return <Row gutter={15}>
        <Col span={24}>
            <RadioMode mods={mods}/>
        </Col>
        <SelectLength
            lengths={lengths}
            isThemes={isThemes}
            typeAnzan={typeAnzan}
            isMultiplication={isMultiplication}
        />
        <SelectType
            types={types}
            isThemes={isThemes}
            isMultiplication={isMultiplication}
        />
        <SelectTheme
            themes={themes}
            isThemes={isThemes}
            isMultiplication={isMultiplication}
        />
    </Row>;
};

export default React.memo(HeaderSetting);