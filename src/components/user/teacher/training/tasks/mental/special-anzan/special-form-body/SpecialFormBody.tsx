import React from 'react';
import ConfigBlock from "../../../config/Config";
import SpecialFormItems from "./special-form-items/SpecialFormItems";
import usingFormBodyLayout from "../../layout/form-body/usingFormBody.layout";

interface SpecialFormBodyProps {
    form: any
}

const SpecialFormBody: React.FC<SpecialFormBodyProps> = ({form}) => {
    return <>
        <SpecialFormItems form={form}/>
        <ConfigBlock
            form={form}
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