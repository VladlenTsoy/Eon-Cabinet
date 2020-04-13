import React from 'react';
import ProgressionFormItems from "./progression-form-items/ProgressionFormItems";
import ConfigBlock from "../../config/Config";
import usingFormBodyLayout from "../layout/form-body/usingFormBody.layout";

const Progression:React.FC = () => {
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

export default usingFormBodyLayout(Progression);