import React from 'react';
import FlashFormItems from "./flash-form-items/FlashFormItems";
import ConfigBlock from "../../config/Config";
import FormSettingLayout from "../layout/form-setting/FormSetting.layout";

interface FlashProps {
    isEdit?: boolean;
    userSetting?: any;
    clearSaveSetting?: any;
    startApplication?: (setting: any, print: boolean) => void;
    addSettingHomework?: (setting: any) => void;
}

const Flash: React.FC<FlashProps> = (
    {
        userSetting,
        clearSaveSetting,
        startApplication,
        addSettingHomework,
        isEdit,
    }
) => {
    return <FormSettingLayout
        initialValues={{
            from: 1,
            to: 1,
            count: 1,
            time: 1,
            extra: [],
            sound: 'basic',
        }}
        userSetting={userSetting}
        isEdit={isEdit}
        clearSaveSetting={clearSaveSetting}
        startApplication={startApplication}
        addSettingHomework={addSettingHomework}>
        <FlashFormItems/>
        <ConfigBlock
            sounds={{
                language: true,
            }}
            mods={{
                plus: true,
            }}
        />
    </FormSettingLayout>;
};

export default Flash;