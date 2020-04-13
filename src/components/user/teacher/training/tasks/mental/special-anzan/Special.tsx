import React from 'react';
import SpecialFormItems from "./special-form-items/SpecialFormItems";
import ConfigBlock from "../../config/Config";
import usingFormBodyLayout from "../layout/form-body/usingFormBody.layout";

const Special: React.FC = () => {
    return <>
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
    </>;
};

export default usingFormBodyLayout(Special);