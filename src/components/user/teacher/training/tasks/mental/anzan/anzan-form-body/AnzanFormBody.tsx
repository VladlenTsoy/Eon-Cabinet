import React from 'react';
import TypeSettingAnzan from "./type-setting-anzan/TypeSettingAnzan";
import HeaderSettingAnzan from "./header-setting-anzan/HeaderSettingAnzan";
import BodySettingAnzan from "./body-setting.anzan/BodySettingAnzan";
import ConfigBlock from "../../../config/Config";
import usingFormBodyLayout from "../../layout/form-body/usingFormBody.layout";

interface AnzanFormBodyProps {
    form: any;
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
    const typeAnzanValue = form.getFieldValue('anzan');
    const modeValue = form.getFieldValue('mode');
    const lengthValue = form.getFieldValue('length');
    const isMultiplication = modeValue === 'divide' || modeValue === 'multiply';

    return <>
        {
            !isMultiAnzan ?
                <TypeSettingAnzan/> : null
        }
        <HeaderSettingAnzan
            typeAnzan={typeAnzanValue}
            mods={mods}
            isMultiplication={isMultiplication}
            setting={setting}
            lengths={lengths}
            types={types}
            themes={themes}
        />
        <BodySettingAnzan
            length={lengthValue}
            typeAnzan={typeAnzanValue}
            isMultiAnzan={isMultiAnzan}
            mods={mods}
            setting={setting}
            isMultiplication={isMultiplication}
        />
        <ConfigBlock
            sounds={
                typeAnzanValue !== 'list' && sound ?
                    {
                        language: !isMultiplication,
                    } : false
            }
            mods={
                isMultiplication ?
                    {
                        group: !isMultiAnzan && typeAnzanValue !== 'list'
                    } :
                    {
                        plus: true,
                        group: !isMultiAnzan && typeAnzanValue !== 'list',
                        comma: true,
                        mirror: true,
                        abacus: typeAnzanValue !== 'turbo' && typeAnzanValue !== 'list'
                    }
            }
        />
    </>;
};

export default usingFormBodyLayout(AnzanFormBody);