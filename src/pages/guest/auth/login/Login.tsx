import React, {useState} from "react";
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Input, Form} from "antd";
import {Link} from "react-router-dom";
import AuthLayout from "lib/layouts/auth/AuthLayout";
import {FormItem} from "../../../../lib/ui";
import {useDispatch} from "react-redux";
import {authUser} from "../../../../store/common/user/authUser";

const Login: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = async (values: any) => {
        setLoading(true);
        await dispatch(authUser(values));
        setLoading(false);
    };

    return <AuthLayout
        title="Авторизация"
        subTitle="Вход в личный кабинет"
        onFinish={handleSubmit}
    >
        <FormItem
            name="login"
            rules={[
                {required: true, message: 'Введите E-mail!'},
                // {type: 'email', message: 'Введен неверный E-mail!'}
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
                <Button block disabled={loading}>
                    Регистрация
                </Button>
            </Link>
        </Form.Item>
    </AuthLayout>
};

export default Login;