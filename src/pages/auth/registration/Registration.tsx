import React, {useState} from 'react';
import {Card, FormItem} from "lib/components";
import {Title, FormWrapper} from "../AuthLayouts";
import {Button, Form, Input, message} from "antd";
import {Link, useHistory} from "react-router-dom";
import {ArrowLeftOutlined} from '@ant-design/icons';
import {apiOld, updateToken} from "utils/api.old";

const Registration = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values: any) => {
        setLoading(true);
        try {
            const response = await apiOld.guest.post('/registration', values);
            updateToken(response.data.token);
            history.push('/');
        } catch (e) {
            if (e.response)
                message.error(e.response.data.message);
            else
                message.error('Неизвестная ошибка!');
            setLoading(false);
        }
    }

    return <Card>
        <Title>Регистрация</Title>
        <FormWrapper onFinish={handleSubmit} size="large">
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
        </FormWrapper>
    </Card>;
};

export default Registration;