import React, {useState} from "react";
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Input, message, Form} from "antd";
import {useHistory, Link} from "react-router-dom";
import {Card} from "lib";
import {FormItem} from "../../../lib";
import {Title, SubTitle, FormWrapper} from "../AuthLayouts";
import {api, updateToken} from "utils/api";

const Login: React.FC = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values: any) => {
        setLoading(true);
        try {
            const response = await api.guest.post('/login', values);
            updateToken(response.data.token);
            history.push('/');
        } catch (e) {
            if (e.response)
                message.error(e.response.data.message);
            else
                message.error('Неизвестная ошибка!');
            setLoading(false);
        }
    };

    return <Card>
        <Title>Авторизация</Title>
        <SubTitle>Вход в личный кабинет</SubTitle>
        <FormWrapper onFinish={handleSubmit} size="large">
            <FormItem
                name="email"
                rules={[
                    {required: true, message: 'Введите E-mail!'},
                    {type: 'email', message: 'Введен неверный E-mail!'}
                ]}
            >
                <Input prefix={<UserOutlined/>} placeholder="Почта"/>
            </FormItem>
            <FormItem name="password" requiredMsg="Введите пароль!">
                <Input.Password prefix={<LockOutlined/>} placeholder="Пароль"/>
            </FormItem>
            <div style={{textAlign: 'right', marginBottom: '0.5rem'}}>
                <Link to="/forgot-password">
                    Забыли пароль?
                </Link>
            </div>
            <Form.Item style={{marginBottom: '0.75rem'}}>
                <Button type="primary" htmlType="submit" block loading={loading}>
                    Войти
                </Button>
            </Form.Item>
            <Form.Item>
                <Link to="/registration">
                    <Button block loading={loading}>
                        Регистрация
                    </Button>
                </Link>
            </Form.Item>
        </FormWrapper>
    </Card>
};

export default Login;