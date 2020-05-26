import React from "react";
import {ArrowLeftOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Input, Form} from "antd";
import {useState} from "react";
import {Title, FormWrapper} from "../AuthLayouts";
import {Card} from "lib";
import {FormItem} from "../../../layouts/components";
import styled from "styled-components";
import {Link} from "react-router-dom";

const TextLink = styled(Link)<any>`
  float: ${props => props.position || 'inherit'}
  vertical-align: center;

  i{
    vertical-align: center;
    margin-right: 0.5rem;
  }
`;

const ForgotPasswordBlock = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const onFinish = (values: any) => {
        setLoading(true);
        console.log(values);
        setLoading(false);
    };

    return (
        <Card>
            <Title>Восстановление пароля</Title>
            <FormWrapper onFinish={onFinish} className="login-form">
                <FormItem name="login" requiredMsg="Введите почту!">
                    <Input
                        prefix={<UserOutlined style={{color: 'rgba(0,0,0,.25)'}}/>}
                        placeholder="Введите почту"
                    />
                </FormItem>
                <Form.Item>
                    <TextLink to="/login">
                        <ArrowLeftOutlined/>Назад
                    </TextLink>
                    <Button type="primary" htmlType="submit" block loading={loading}>
                        Отправить
                    </Button>
                </Form.Item>
            </FormWrapper>
        </Card>
    );
};

export default ForgotPasswordBlock;