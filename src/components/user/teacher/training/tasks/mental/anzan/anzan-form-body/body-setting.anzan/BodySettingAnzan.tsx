import React from 'react';
import ListSetting from "./list-setting/ListSetting";
import BasicSetting from "./basic-setting/BasicSetting";

interface BodySettingAnzanProps {
    typeAnzan: string;
    length: number;
    mods?: string;
    isMultiAnzan: boolean;
    setting: any;
    isMultiplication: boolean;
}

const BodySettingAnzan: React.FC<BodySettingAnzanProps> = (
    {
        typeAnzan,
        length,
        mods,
        isMultiAnzan,
        setting,
        isMultiplication
    }
) => {
    return typeAnzan === 'list' ?
        <ListSetting/> :
        <BasicSetting
            length={length}
            mods={mods}
            multi={isMultiAnzan}
            setting={setting}
            isMultiplication={isMultiplication}
        />
};

export default BodySettingAnzan;