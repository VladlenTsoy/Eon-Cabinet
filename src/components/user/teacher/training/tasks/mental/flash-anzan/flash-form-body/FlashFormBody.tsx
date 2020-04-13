import React from 'react';
import ConfigBlock from "../../../config/Config";
import FlashFormItems from "./flash-form-items/FlashFormItems";
import usingFormBodyLayout from "../../layout/form-body/usingFormBody.layout";

interface FlashFormBodyProps {
}

const FlashFormBody: React.FC<FlashFormBodyProps> = () => {
    return <>
        <FlashFormItems/>
        <ConfigBlock
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
