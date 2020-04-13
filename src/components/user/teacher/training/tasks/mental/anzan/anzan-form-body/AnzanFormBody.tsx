import React from 'react';
import TypeSettingAnzan from "./type-setting-anzan/TypeSettingAnzan";
import HeaderSettingAnzan from "./header-setting-anzan/HeaderSettingAnzan";
import BodySettingAnzan from "./body-setting.anzan/BodySettingAnzan";
import ConfigBlock from "../../../config/Config";
import usingFormBodyLayout from "../../layout/form-body/usingFormBody.layout";

interface AnzanFormBodyProps {
    fields: any;
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
        fields,
        sound,
        setting,
        lengths,
        types,
        themes,
        isMultiAnzan,
        mods,
    }
) => {
    const typeAnzan = fields.find((field: any) => field.name.includes('anzan')).value;
    const mode = fields.find((field: any) => field.name.includes('mode')).value;
    const length = fields.find((field: any) => field.name.includes('length')).value;
    const isMultiplication = mode === 'divide' || mode === 'multiply';

    return <>
        {
            !isMultiAnzan ?
                <TypeSettingAnzan/> : null
        }
        <HeaderSettingAnzan
            typeAnzan={typeAnzan.value}
            mods={mods}
            isMultiplication={isMultiplication}
            setting={setting}
            lengths={lengths}
            types={types}
            themes={themes}
        />
        <BodySettingAnzan
            length={length}
            typeAnzan={typeAnzan}
            isMultiAnzan={isMultiAnzan}
            mods={mods}
            setting={setting}
            isMultiplication={isMultiplication}
        />
        <ConfigBlock
            sounds={
                typeAnzan !== 'list' && sound ?
                    {
                        language: !isMultiplication,
                    } : false
            }
            mods={
                isMultiplication ?
                    {
                        group: !isMultiAnzan && typeAnzan !== 'list'
                    } :
                    {
                        plus: true,
                        group: !isMultiAnzan && typeAnzan !== 'list',
                        comma: true,
                        mirror: true,
                        abacus: typeAnzan !== 'turbo' && typeAnzan !== 'list'
                    }
            }
        />
    </>;
};

export default usingFormBodyLayout(AnzanFormBody);