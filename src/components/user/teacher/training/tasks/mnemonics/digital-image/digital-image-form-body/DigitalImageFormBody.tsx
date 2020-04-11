import React from 'react';
import usingFormBodyLayout from "../../../mental/layout/form-body/usingFormBody.layout";
import {Select} from "antd";
import {FormItem} from "../../../../../../../../layouts/components";

interface DigitalImageFormBodyProps {
    form: any;
}

const DigitalImageFormBody:React.FC<DigitalImageFormBodyProps> = ({form}) => {
    return <FormItem form={form} name="mode" label="Мод" required="Выберите мод!">
        <Select>
            <Select.Option value="1">По порядку</Select.Option>
            <Select.Option value="2">Вразброс</Select.Option>
        </Select>
    </FormItem>;
};

export default usingFormBodyLayout(DigitalImageFormBody);