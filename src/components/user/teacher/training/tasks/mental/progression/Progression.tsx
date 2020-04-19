import React from 'react';
import ProgressionFormItems from "./progression-form-items/ProgressionFormItems";
import ConfigBlock from "../../config/Config";
import FormSettingLayout from "../layout/form-setting/FormSetting.layout";

interface ProgressionProps {
    isEdit?: boolean;
    userSetting?: any;
    clearSaveSetting?: any;
    startApplication?: (setting: any, print: boolean) => void;
    addSettingHomework?: (setting: any) => void;
}

const Progression:React.FC<ProgressionProps> = (
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
        <ProgressionFormItems/>
        <ConfigBlock
            sounds={{
                language: true,
            }}
            mods={{
                plus: true, abacus: true,
            }}/>
    </FormSettingLayout>;
};

export default Progression;