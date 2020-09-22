import React, {useState} from "react"
import {FormItem, InputPassword} from "lib/ui"
import {Button, Form, Input} from "antd"
import {useHistory} from "react-router-dom"
import {useDispatch} from "react-redux"
import {registrationUser} from "../../../../store/common/user/registrationUser"
import {useLanguage} from "../../../../hooks/use-language"
import RegistrationLayout from "../../../../lib/layouts/auth/registration/Registration"

const Registration = () => {
    const {l} = useLanguage()
    const history = useHistory()
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const handleSubmit = async (values: any) => {
        setLoading(true)
        const response = await dispatch(registrationUser(values))
        // @ts-ignore
        if (response?.type === "user/registration/fulfilled") history.push("/")
        else setLoading(false)
    }

    return (
        <RegistrationLayout handleSubmit={handleSubmit}>
            <FormItem
                name="first_name"
                requiredMsg={`${l("enter_name")}!`}
            >
                <Input placeholder={l("name")} />
            </FormItem>
            <FormItem
                name="last_name"
                requiredMsg={`${l("enter_surname")}!`}
            >
                <Input placeholder={l("surname")} />
            </FormItem>
            <FormItem
                name="email"
                rules={[
                    {
                        required: true,
                        message: `${l("enter_email")}!`
                    },
                    {
                        type: "email",
                        message: `${l("invalid_email")}!`
                    }
                ]}
            >
                <Input placeholder={l("email")} />
            </FormItem>
            <InputPassword />
            <Form.Item
                style={{marginBottom: "0.75rem", marginTop: "2rem"}}
            >
                <Button
                    type="primary"
                    htmlType="submit"
                    block
                    size="large"
                    loading={loading}
                >
                    {l("sing_up")}
                </Button>
            </Form.Item>
        </RegistrationLayout>
    )
}

export default Registration
