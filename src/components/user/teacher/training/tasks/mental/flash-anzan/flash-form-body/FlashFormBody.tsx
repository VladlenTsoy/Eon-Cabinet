import React from 'react';
import ConfigBlock from "../../../config/Config";
import FlashFormItems from "./flash-form-items/FlashFormItems";
import usingFormBodyLayout from "../../layout/form-body/usingFormBody.layout";

interface FlashFormBodyProps {
    form: any;
}

const FlashFormBody: React.FC<FlashFormBodyProps> = ({form}) => {
    return <>
        <FlashFormItems form={form}/>
        <ConfigBlock
            form={form}
            sounds={{
                language: true,
            }}
            mods={{
                plus: true,
            }}
        />
    </>;
};

export default usingFormBodyLayout(FlashFormBody);
