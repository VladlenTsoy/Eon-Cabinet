import React from 'react';
import SpecialFormItems from "./special-form-items/SpecialFormItems";
import ConfigBlock from "../../config/Config";
import {Form} from "antd";

interface SpecialProps {
    userSetting?: any;
    clearSaveSetting?: any;
    startApplication?: (setting: any, print: boolean) => void;
    addSettingHomework?: (setting: any) => void;
}

const Special: React.FC<SpecialProps> = () => {
    return <Form layout="vertical">
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
    </Form>;
};

export default Special;