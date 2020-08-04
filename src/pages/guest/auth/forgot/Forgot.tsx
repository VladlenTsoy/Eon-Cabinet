import React from "react";
import {ArrowLeftOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Input, Form} from "antd";
import {useState} from "react";
import {FormItem} from "../../../../lib/components";
import {Link} from "react-router-dom";
import AuthLayout from "../../../../lib/layouts/auth/AuthLayout";

const ForgotPasswordBlock = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState<boolean>(false);

    const onFinish = async (values: any) => {
        setLoading(true);
        console.log(values);
        await form.validateFields();
        setLoading(false);
    };

    return <AuthLayout title="Восстановление пароля" onFinish={onFinish}>
        <FormItem name="login" requiredMsg="Введите почту!">
            <Input
                prefix={<UserOutlined style={{color: 'rgba(0,0,0,.25)'}}/>}
                placeholder="Введите почту"
            />
        </FormItem>
        <Form.Item style={{marginBottom: '0.75rem'}}>
            <Button type="primary" htmlType="submit" block loading={loading}>
                Отправить
            </Button>
        </Form.Item>
        <Form.Item>
            <Link to="/login">
                <Button block icon={<ArrowLeftOutlined/>}>Назад</Button>
            </Link>
        </Form.Item>
    </AuthLayout>
};

export default ForgotPasswordBlock;