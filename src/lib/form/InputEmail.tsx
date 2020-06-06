import React from "react";
import {Input} from "antd";
import {FormItem} from "../../lib";

const InputEmail: React.FC = () => {
    const rules: any = [
        {type: 'email', message: 'Введен неверный E-mail!',},
    ];

    return <FormItem name="email" rules={rules} label="E-mail">
        <Input/>
    </FormItem>
};

export default InputEmail;