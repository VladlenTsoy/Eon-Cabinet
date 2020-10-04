import React, {useState} from "react"
import {Input, Switch} from "antd"
import {FormItem} from "../index"
import styled from "styled-components"
import {FormItemProps} from "antd/es/form"
import {useLanguage} from "../../../hooks/use-language"

const InputPasswordWrapper = styled.div`
    position: relative;

    .ant-switch {
        position: absolute;
        right: 0;
        z-index: 5;

        @media (max-width: 576px) {
            top: 0;
        }
    }
`

interface InputPasswordProps {
    user?: any
    name?: string
    label?: string
    placeholder?: string
    marginBottom?: string
    dependencies?: string[]
    rules?: FormItemProps["rules"]
}

const InputPassword: React.FC<InputPasswordProps> = ({
    user,
    label,
    name = "password",
    dependencies = [],
    rules,
    placeholder
}) => {
    const {l} = useLanguage()
    const [disabled, setDisabled] = useState<boolean>(
        !!(user && user.first_name)
    )
    const _rules = rules || [
        {required: !disabled, message: `${l("enter_password")}!`},
        {min: 5, message: `${l("password_min")}!`},
        {
            pattern: /^[A-Za-z0-9]+$/,
            whitespace: true,
            message: `${l("password_only_latin")}`
        }
    ]

    const toggleHandler = () => setDisabled(!disabled)

    return (
        <InputPasswordWrapper>
            {user && user.first_name ? (
                <Switch defaultChecked onChange={toggleHandler} />
            ) : null}
            <FormItem
                name={name}
                rules={_rules}
                label={label}
                dependencies={dependencies}
            >
                <Input.Password
                    disabled={disabled}
                    placeholder={placeholder || l("password")}
                />
            </FormItem>
        </InputPasswordWrapper>
    )
}

export default InputPassword
