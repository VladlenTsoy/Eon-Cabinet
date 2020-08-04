import React from 'react';
import {Select} from "antd";
import {FormItem} from "../../../../../../../../lib/components";
import FormSettingLayout from "../../mental/layout/form-setting/FormSetting.layout";

interface DigitalImageProps {
    userSetting?: any;
    clearSaveSetting?: any;
    startApplication?: (setting: any, print: boolean) => void;
    addSettingHomework?: (setting: any) => void;
}

const DigitalImage: React.FC<DigitalImageProps> = (
    {
        userSetting,
        clearSaveSetting,
        startApplication,
        addSettingHomework,
    }
) => {
    const setting = userSetting.hasOwnProperty('mode') ? {...userSetting, mode: String(userSetting.mode)} : userSetting;
    return <FormSettingLayout
        initialValues={{
            mode: '1',
        }}
        userSetting={setting}
        clearSaveSetting={clearSaveSetting}
        startApplication={startApplication}
        addSettingHomework={addSettingHomework}
    >
        <FormItem name="mode" label="Мод" requiredMsg="Выберите мод!">
            <Select>
                <Select.Option value="1">По порядку</Select.Option>
                <Select.Option value="2">Вразброс</Select.Option>
            </Select>
        </FormItem>
    </FormSettingLayout>;
};

export default DigitalImage;