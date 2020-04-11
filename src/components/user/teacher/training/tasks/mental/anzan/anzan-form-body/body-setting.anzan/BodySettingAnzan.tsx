import React from 'react';
import ListSetting from "./list-setting/ListSetting";
import BasicSetting from "./basic-setting/BasicSetting";

interface BodySettingAnzanProps {
    form: any;
    mods?: string;
    isMultiAnzan: boolean;
    setting: any;
    isMultiplication: boolean;
}

const BodySettingAnzan: React.FC<BodySettingAnzanProps> = (
    {
        form,
        mods,
        isMultiAnzan,
        setting,
        isMultiplication
    }
) => {
    return form.getFieldValue('anzan') === 'list' ?
        <ListSetting
            form={form}
        /> :
        <BasicSetting
            form={form}
            mods={mods}
            multi={isMultiAnzan}
            setting={setting}
            isMultiplication={isMultiplication}
        />
};

export default BodySettingAnzan;