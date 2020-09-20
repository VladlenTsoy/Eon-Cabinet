import React, {useState} from "react";
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Input, Form} from "antd";
import {Link} from "react-router-dom";
import AuthLayout from "lib/layouts/auth/AuthLayout";
import {FormItem} from "../../../../lib/ui";
import {useDispatch} from "react-redux";
import {authUser} from "../../../../store/common/user/authUser";
import {useLanguage} from "../../../../hooks/use-language"

const Login: React.FC = () => {
    const {l} = useLanguage();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = async (values: any) => {
        setLoading(true);
        await dispatch(authUser(values));
        setLoading(false);
    };

    return <AuthLayout
        title={l('authorization')}
        subTitle={l('login_to_your_account')}
        onFinish={handleSubmit}
    >
        <FormItem
            name="login"
            rules={[
                {required: true, message: `${l('enter_email')}!`},
                // {type: 'email', message: `${l('invalid_email')}!`}
            ]}
        >
            <Input prefix={<UserOutlined/>} placeholder={l('email')}/>
        </FormItem>
        <FormItem name="password" requiredMsg={l('enter_password')}>
            <Input.Password prefix={<LockOutlined/>} placeholder={l('password')}/>
        </FormItem>
        <div style={{textAlign: 'right', marginBottom: '0.5rem'}}>
            <Link to="/forgot-password">
                {l('forgot_password')}?
            </Link>
        </div>
        <Form.Item style={{marginBottom: '0.75rem'}}>
            <Button type="primary" htmlType="submit" block loading={loading}>
                {l('login')}
            </Button>
        </Form.Item>
        <Form.Item>
            <Link to="/registration">
                <Button block disabled={loading}>
                    {l('registration')}
                </Button>
            </Link>
        </Form.Item>
    </AuthLayout>
};

export default Login;