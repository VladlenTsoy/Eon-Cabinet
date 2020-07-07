import React from "react";
import {ArrowLeftOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Input, Form} from "antd";
import {useState} from "react";
import {Title, FormWrapper} from "../AuthLayouts";
import {Card} from "lib";
import {FormItem} from "../../../lib";
import {Link} from "react-router-dom";

const ForgotPasswordBlock = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState<boolean>(false);

    const onFinish = async (values: any) => {
        setLoading(true);
        console.log(values);
        await form.validateFields();
        setLoading(false);
    };

    return <Card>
        <Title>Восстановление пароля</Title>
        <FormWrapper form={form} onFinish={onFinish} className="login-form" size="large">
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
        </FormWrapper>
    </Card>
};

export default ForgotPasswordBlock;