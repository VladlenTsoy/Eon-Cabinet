import React from 'react';
import ConfigBlock from "../../../config/Config";
import FlashFormItems from "./flash-form-items/FlashFormItems";
import usingFormBodyLayout from "../../layout/form-body/usingFormBody.layout";
import {FormInstance} from "antd/es/form";

interface FlashFormBodyProps {
    form: FormInstance;
}

const FlashFormBody: React.FC<FlashFormBodyProps> = ({form}) => {
    return <>
        <FlashFormItems/>
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
