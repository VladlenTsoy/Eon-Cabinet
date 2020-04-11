import React, {useState} from "react";
import {Input, Switch} from "antd";
import {FormItem} from "../index";
import styled from "styled-components";

const InputPasswordWrapper = styled.div`
  position: relative;
  
  .ant-switch{
    position: absolute;
    right: 0;
    top: 10px;
    z-index: 5;
    
    @media (max-width: 576px) {
      top: 0;
    }
  }
`;

interface InputPasswordProps {
    form: any;
    user: any;
}

const InputPassword: React.FC<InputPasswordProps> = ({form, user}) => {
    const [disabled, setDisabled] = useState<boolean>(!!(user && user.first_name));
    const rules = [
        {required: !disabled, message: "Введите пароль!"},
        {min: 5, message: "Пароль должен состоять мин. из 5 символов!"},
        {pattern: /^[A-Za-z0-9]+$/, whitespace: true, message: "Только латинский буквы и цифры!"}
    ];

    const toggleHandler = () => setDisabled(!disabled);

    return <InputPasswordWrapper>
        {user && user.first_name ? <Switch defaultChecked onChange={toggleHandler}/> : null}
        <FormItem
            form={form}
            name="password"
            rules={rules}
            label="Пароль"
        >
            <Input.Password disabled={disabled}/>
        </FormItem>
    </InputPasswordWrapper>
};

export default InputPassword;