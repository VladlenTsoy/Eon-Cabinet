import React from 'react';
import usingFormBodyLayout from "../layout/form-body/usingFormBody.layout";
import FlashFormItems from "./flash-form-items/FlashFormItems";
import ConfigBlock from "../../config/Config";

const Flash: React.FC = () => {
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

export default usingFormBodyLayout(Flash);