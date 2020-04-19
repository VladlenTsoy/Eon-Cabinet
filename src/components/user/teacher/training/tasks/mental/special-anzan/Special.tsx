import React from 'react';
import SpecialFormItems from "./special-form-items/SpecialFormItems";
import ConfigBlock from "../../config/Config";
import FormSettingLayout from "../layout/form-setting/FormSetting.layout";

interface SpecialProps {
    isEdit?: boolean;
    userSetting?: any;
    clearSaveSetting?: any;
    startApplication?: (setting: any, print: boolean) => void;
    addSettingHomework?: (setting: any) => void;
}

const Special: React.FC<SpecialProps> = (
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
            mode: 'plus',
            from: 1,
            to: 1,
            count: 1,
            times: 1,
            time: 1,
            extra: [],
            sound: 'basic',
        }}
        userSetting={userSetting}
        isEdit={isEdit}
        clearSaveSetting={clearSaveSetting}
        startApplication={startApplication}
        addSettingHomework={addSettingHomework}
    >
        <SpecialFormItems/>
        <ConfigBlock
            sounds={{
                language: false,
            }}
            mods={{
                plus: true,
                group: true,
                comma: true,
            }}
        />
    </FormSettingLayout>;
};

export default Special;