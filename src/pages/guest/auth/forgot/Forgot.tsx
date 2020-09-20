import React from "react";
import {ArrowLeftOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Input, Form} from "antd";
import {useState} from "react";
import {FormItem} from "../../../../lib/ui";
import {Link} from "react-router-dom";
import AuthLayout from "../../../../lib/layouts/auth/AuthLayout";
import {useDispatch} from "react-redux"
import {forgotPassword} from "../../../../store/common/user/recoveryUser"

const ForgotPasswordBlock = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useDispatch();

    const onFinish = async (values: any) => {
        setLoading(true);
        await dispatch(forgotPassword(values));
        setLoading(false);
    };

    return <AuthLayout title="Восстановление пароля" onFinish={onFinish}>
        <FormItem name="email" requiredMsg="Введите почту!">
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