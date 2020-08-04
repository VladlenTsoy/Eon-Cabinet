import React, {useState} from 'react';
import {FormItem} from "lib/components";
import {Button, Form, Input} from "antd";
import {Link, useHistory} from "react-router-dom";
import {ArrowLeftOutlined} from '@ant-design/icons';
import AuthLayout from "lib/layouts/auth/AuthLayout";
import {useDispatch} from "react-redux";
import {registrationUser} from "../../../../store/common/user/registrationUser";

const Registration = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = async (values: any) => {
        setLoading(true);
        const response = await dispatch(registrationUser(values));
        if (response.type === 'user/registration/fulfilled')
            history.push('/')
        else
            setLoading(false);
    }

    return <AuthLayout
        title="Регистрация"
        onFinish={handleSubmit}
    >
        <FormItem name="first_name" requiredMsg="Введите Имя!">
            <Input placeholder="Имя"/>
        </FormItem>
        <FormItem name="last_name" requiredMsg="Введите Фамилию!">
            <Input placeholder="Фамилия"/>
        </FormItem>
        <FormItem name="email" requiredMsg="Введите Почту!">
            <Input placeholder="Почта"/>
        </FormItem>
        <FormItem name="password" requiredMsg="Введите пароль!">
            <Input.Password placeholder="Пароль"/>
        </FormItem>
        <FormItem
            dependencies={['password']}
            name="conf_password"
            rules={[
                {
                    required: true,
                    message: 'Потвердите пароль!',
                },
                ({getFieldValue}) => ({
                    validator(rule, value) {
                        if (!value || getFieldValue('password') === value)
                            return Promise.resolve();
                        return Promise.reject('Пароли не совпадают!');
                    },
                }),
            ]}
        >
            <Input.Password placeholder="Подтвердите пароль"/>
        </FormItem>
        <Form.Item style={{marginBottom: '0.75rem'}}>
            <Button type="primary" htmlType="submit" block loading={loading}>
                Зарегистрироваться
            </Button>
        </Form.Item>
        <Form.Item>
            <Link to="/login">
                <Button block icon={<ArrowLeftOutlined/>}>Назад</Button>
            </Link>
        </Form.Item>
    </AuthLayout>;
};

export default Registration;