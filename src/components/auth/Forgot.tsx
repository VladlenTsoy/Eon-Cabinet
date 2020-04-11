import React from "react";
import { ArrowLeftOutlined, UserOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Input } from "antd";
import {useState} from "react";
import {Title, FormWrapper} from "./AuthLayouts";
import {Card} from "lib";
import {FormItem, TextLink} from "../../layouts/components";

const ForgotPasswordBlock = ({form}: any) => {
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setLoading(true);

        form.validateFields(async (err: any, values: any) => {
            if (!err) {
                console.log(values);
            }
            setLoading(false);
        });
    };

    return (
        <Card>
            <Title>Восстановление пароля</Title>
            <FormWrapper onSubmit={handleSubmit} className="login-form">
                <FormItem form={form} name="login" required="Введите почту!">
                    <Input
                        prefix={<UserOutlined style={{color: 'rgba(0,0,0,.25)'}} />}
                        placeholder="Введите почту"
                    />
                </FormItem>
                <Form.Item>
                    <TextLink to="/login">
                        <ArrowLeftOutlined />Назад
                    </TextLink>
                    <Button type="primary" htmlType="submit" block loading={loading}>
                        Отправить
                    </Button>
                </Form.Item>
            </FormWrapper>
        </Card>
    );
};

export default Form.create({name: 'auth_forgot_password'})(ForgotPasswordBlock);