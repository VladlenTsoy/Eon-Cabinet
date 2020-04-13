import React from 'react';
import ProgressionFormItems from "./progression-form-items/ProgressionFormItems";
import ConfigBlock from "../../../config/Config";
import usingFormBodyLayout from "../../layout/form-body/usingFormBody.layout";

interface ProgressionFormBodyProps {
    clearSaveSetting?: () => void;
    startApplication?: (setting: any, print: boolean) => void;
    addSettingHomework?: (setting: any) => void;
    setting: any;
    onChange: (changedFields: any, fieldsValue: any) => void;
}

const ProgressionFormBody: React.FC<ProgressionFormBodyProps> = () => {
    return <>
        <ProgressionFormItems/>
        <ConfigBlock
            sounds={{
                language: true,
            }}
            mods={{
                plus: true, abacus: true,
            }}/>
    </>;
};

export default usingFormBodyLayout(ProgressionFormBody);