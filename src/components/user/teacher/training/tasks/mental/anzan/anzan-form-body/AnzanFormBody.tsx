import React from 'react';
import TypeSettingAnzan from "./type-setting-anzan/TypeSettingAnzan";
import HeaderSettingAnzan from "./header-setting-anzan/HeaderSettingAnzan";
import BodySettingAnzan from "./body-setting.anzan/BodySettingAnzan";
import ConfigBlock from "../../../config/Config";
import usingFormBodyLayout from "../../layout/form-body/usingFormBody.layout";
import {FormInstance} from "antd/es/form";

interface AnzanFormBodyProps {
    form: FormInstance;
    sound?: boolean;
    setting: any;
    lengths: any;
    types: any;
    themes: any;
    isMultiAnzan: boolean;
    isEdit: boolean;
    mods?: string;
}

const AnzanFormBody: React.FC<AnzanFormBodyProps> = (
    {
        form,
        sound,
        setting,
        lengths,
        types,
        themes,
        isMultiAnzan,
        mods,
    }
) => {
    const type = form.getFieldValue('anzan');
    const isMultiplication = form.getFieldValue('mode') === 'divide' || form.getFieldValue('mode') === 'multiply';

    return <>
        {!isMultiAnzan ? <TypeSettingAnzan form={form}/> : null}
        <HeaderSettingAnzan
            form={form}
            mods={mods}
            isMultiplication={isMultiplication}
            setting={setting}
            lengths={lengths}
            types={types}
            themes={themes}
        />
        <BodySettingAnzan
            form={form}
            isMultiAnzan={isMultiAnzan}
            mods={mods}
            setting={setting}
            isMultiplication={isMultiplication}
        />
        <ConfigBlock
            sounds={
                type !== 'list' && sound ?
                    {
                        language: !isMultiplication,
                    } : false
            }
            mods={
                isMultiplication ?
                    {
                        group: !isMultiAnzan && type !== 'list'
                    } :
                    {
                        plus: true,
                        group: !isMultiAnzan && type !== 'list',
                        comma: true,
                        mirror: true,
                        abacus: type !== 'turbo' && type !== 'list'
                    }
            }
        />
    </>;
};

export default usingFormBodyLayout(AnzanFormBody);