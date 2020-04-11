import React from "react";
import {Input} from "antd";
import {FormItem} from "../index";

const InputLogin: React.FC<any> = ({form}) => {
    const rules = [
        {required: true, message: "Введите логин!"},
        {min: 5, message: "Логин должен состоять мин. из 5 символов!"},
        {pattern: /^[A-Za-z0-9]+$/, whitespace: true, message: "Только латинский буквы и цифры!"}
    ];
    return <FormItem form={form} name="login" rules={rules} label="Логин">
        <Input autoComplete="off"/>
    </FormItem>
};

export default InputLogin;