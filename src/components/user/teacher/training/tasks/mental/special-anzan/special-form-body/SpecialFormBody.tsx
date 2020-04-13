import React from 'react';
import ConfigBlock from "../../../config/Config";
import SpecialFormItems from "./special-form-items/SpecialFormItems";
import usingFormBodyLayout from "../../layout/form-body/usingFormBody.layout";

interface SpecialFormBodyProps {
}

const SpecialFormBody: React.FC<SpecialFormBodyProps> = () => {
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

export default usingFormBodyLayout(SpecialFormBody);