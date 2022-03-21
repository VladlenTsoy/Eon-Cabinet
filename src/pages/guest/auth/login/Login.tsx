import React, {useState} from "react"
import {LockOutlined, UserOutlined} from "@ant-design/icons"
import {Input, Form} from "antd"
import {Link} from "react-router-dom"
import LoginLayout from "lib/layouts/auth/login/LoginLayout"
import {FormItem, Button} from "../../../../lib/ui"
import {useDispatch} from "react-redux"
import {authUser} from "../../../../store/common/user/authUser"
import {UserAddOutlined} from "@ant-design/icons"
import {useTranslation} from "react-i18next"
import styles from "./Login.module.less"

const Login: React.FC = () => {
    const {t} = useTranslation("auth")
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const handleSubmit = async (values: any) => {
        setLoading(true)
        await dispatch(authUser(values))
        setLoading(false)
    }

    return (
        <LoginLayout title={t("authorization")} subTitle={t("login_to_your_account")} onFinish={handleSubmit}>
            <FormItem
                name="login"
                rules={[
                    {required: true, message: `${t("enter_email")}!`}
                    // {type: 'email', message: `${t('invalid_email')}!`}
                ]}
            >
                <Input prefix={<UserOutlined />} placeholder={t("email")} />
            </FormItem>
            <FormItem name="password" requiredMsg={t("enter_password")}>
                <Input.Password prefix={<LockOutlined />} placeholder={t("password")} />
            </FormItem>
            <div className={styles.forgotPassword}>
                <Link to="/forgot-password">{t("forgot_password")}?</Link>
            </div>
            <Form.Item style={{marginBottom: "0.75rem"}}>
                <Button type="primary" htmlType="submit" block loading={loading} size="large">
                    {t("login")}
                </Button>
            </Form.Item>
            <Form.Item>
                <Button to={`/registration`} block disabled={loading} size="large" icon={<UserAddOutlined />}>
                    {t("registration")}
                </Button>
            </Form.Item>
        </LoginLayout>
    )
}

export default Login
