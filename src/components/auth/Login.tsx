import React, {useState} from "react";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Input, message } from "antd";
import {withRouter} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {apiChangeAccessToken} from "../../store/api/actions";
import {Card} from "lib";
import {FormItem, TextLink} from "../../layouts/components";
import {Title, SubTitle, FormWrapper} from "./AuthLayouts";

const Login = ({history, form}: any) => {
    const {api} = useSelector((state: any) => state);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        form.validateFields(async (err: any, values: any) => {
            if (!err) {
                setLoading(true);
                try {
                    const response = await api.guest.post('/login', values);
                    dispatch(apiChangeAccessToken(response.data.data.token));
                    history.push('/');
                } catch (e) {
                    if (e.response)
                        message.error(e.response.data.message);
                    else
                        message.error('Неизвестная ошибка!');
                    setLoading(false);
                }
            }
        });
    };

    return (
        <Card>
            <Title>Авторизация</Title>
            <SubTitle>Вход в личный кабинет</SubTitle>
            <FormWrapper onSubmit={handleSubmit}>
                <FormItem form={form} name="login" required="Введите Логин или Почту!">
                    <Input prefix={<UserOutlined />} placeholder="Логин или Почту"/>
                </FormItem>
                <FormItem form={form} name="password" required="Введите пароль!">
                    <Input.Password prefix={<LockOutlined />} placeholder="Пароль"/>
                </FormItem>
                <Form.Item>
                    <TextLink position="right" to="/forgot-password">
                        Забыли пароль?
                    </TextLink>
                    <Button type="primary" htmlType="submit" block loading={loading}>
                        Войти
                    </Button>
                </Form.Item>
            </FormWrapper>
        </Card>
    );
};

export default Form.create<any>()(withRouter(Login));