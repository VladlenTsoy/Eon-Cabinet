import React from "react"
import {ArrowLeftOutlined, UserOutlined} from "@ant-design/icons"
import {Input, Form} from "antd"
import {useState} from "react"
import {FormItem, Button} from "../../../../lib/ui"
import LoginLayout from "../../../../lib/layouts/auth/login/LoginLayout"
import {useDispatch} from "react-redux"
import {forgotPassword} from "store/user/recoveryUser"

const ForgotPasswordBlock = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const dispatch = useDispatch()

    const onFinish = async (values: any) => {
        setLoading(true)
        await dispatch(forgotPassword(values))
        setLoading(false)
    }

    return (
        <LoginLayout title="Восстановление пароля" onFinish={onFinish}>
            <FormItem name="email" requiredMsg="Введите почту!">
                <Input
                    prefix={<UserOutlined style={{color: "rgba(0,0,0,.25)"}} />}
                    placeholder="Введите почту"
                />
            </FormItem>
            <Form.Item style={{marginBottom: "0.75rem"}}>
                <Button type="primary" htmlType="submit" block loading={loading}>
                    Отправить
                </Button>
            </Form.Item>
            <Form.Item>
                <Button to="/login" block icon={<ArrowLeftOutlined />}>
                    Назад
                </Button>
            </Form.Item>
        </LoginLayout>
    )
}

export default ForgotPasswordBlock
