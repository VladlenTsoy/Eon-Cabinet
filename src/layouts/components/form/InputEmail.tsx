import React from "react";
import {Input} from "antd";
import {FormItem} from "../index";

const InputEmail: React.FC<any> = ({form}) => {
    const rules = [
        {type: 'email', message: 'Введен неверный E-mail!',},
    ];

    return <FormItem form={form} name="email" rules={rules} label="E-mail">
        <Input/>
    </FormItem>
};

export default InputEmail;