import React, {useState} from "react"
import {LockOutlined, UserOutlined} from "@ant-design/icons"
import {Input, Form} from "antd"
import {Link} from "react-router-dom"
import LoginLayout from "lib/layouts/auth/login/LoginLayout"
import {FormItem, Button} from "../../../../lib/ui"
import {useDispatch} from "react-redux"
import {authUser} from "../../../../store/common/user/authUser"
import {useLanguage} from "../../../../hooks/use-language"
import styled from "styled-components"
import {UserAddOutlined} from "@ant-design/icons"

const ForgotPasswordStyled = styled.div`
    text-align: right;
    margin-bottom: 0.5rem;

    a {
        color: ${(props) => props.theme.color_main};

        :hover {
            color: ${(props) => props.theme.color_primary};
        }
    }
`

const Login: React.FC = () => {
    const {l} = useLanguage()
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const handleSubmit = async (values: any) => {
        setLoading(true)
        await dispatch(authUser(values))
        setLoading(false)
    }

    return (
        <LoginLayout
            title={l("authorization")}
            subTitle={l("login_to_your_account")}
            onFinish={handleSubmit}
        >
            <FormItem
                name="login"
                rules={[
                    {required: true, message: `${l("enter_email")}!`}
                    // {type: 'email', message: `${l('invalid_email')}!`}
                ]}
            >
                <Input prefix={<UserOutlined />} placeholder={l("email")} />
            </FormItem>
            <FormItem name="password" requiredMsg={l("enter_password")}>
                <Input.Password
                    prefix={<LockOutlined />}
                    placeholder={l("password")}
                />
            </FormItem>
            <ForgotPasswordStyled>
                <Link to="/forgot-password">{l("forgot_password")}?</Link>
            </ForgotPasswordStyled>
            <Form.Item style={{marginBottom: "0.75rem"}}>
                <Button
                    type="primary"
                    htmlType="submit"
                    block
                    loading={loading}
                    size="large"
                >
                    {l("login")}
                </Button>
            </Form.Item>
            <Form.Item>
                <Link to="/registration">
                    <Button block disabled={loading} size="large" icon={<UserAddOutlined />}>
                        {l("registration")}
                    </Button>
                </Link>
            </Form.Item>
        </LoginLayout>
    )
}

export default Login
