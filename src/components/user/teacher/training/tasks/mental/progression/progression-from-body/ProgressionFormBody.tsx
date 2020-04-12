import React from 'react';
import ProgressionFormItems from "./progression-form-items/ProgressionFormItems";
import ConfigBlock from "../../../config/Config";
import usingFormBodyLayout from "../../layout/form-body/usingFormBody.layout";
import {FormInstance} from "antd/es/form";

interface ProgressionFormBodyProps {
    form: FormInstance,
    clearSaveSetting?: () => void;
    startApplication?: (setting: any, print: boolean) => void;
    addSettingHomework?: (setting: any) => void;
    setting: any;
    onChange: (changedFields: any, fieldsValue: any) => void;
}

const ProgressionFormBody: React.FC<ProgressionFormBodyProps> = ({form}) => {
    return <>
        <ProgressionFormItems/>
        <ConfigBlock
            form={form}
            sounds={{
                language: true,
            }}
            mods={{
                plus: true, abacus: true,
            }}/>
    </>;
};

export default usingFormBodyLayout(ProgressionFormBody);