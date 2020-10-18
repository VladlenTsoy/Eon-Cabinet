import React from "react"
import {LoadingOutlined} from "@ant-design/icons"
import {useHistory} from "react-router-dom"
import btnStyle from "./Button.module.css"

type ButtonType = React.ButtonHTMLAttributes<HTMLButtonElement>

export interface ButtonProps {
    type?: "default" | "primary" | "second" | "warning" | "ghost" | "link" | "danger" | 'dashed'
    size?: "small" | "middle" | "large"
    icon?: React.ReactFragment
    onClick?: ButtonType["onClick"]
    htmlType?: ButtonType["type"]
    ref?: React.Ref<HTMLButtonElement>
    shape?: "circle" | "circle-outline"
    to?: string
    block?: boolean
    ghost?: boolean
    loading?: boolean
    disabled?: boolean
    autoFocus?: ButtonType["autoFocus"]
    className?: ButtonType["className"]
    style?: ButtonType["style"]
    form?: ButtonType["form"]
}

const Button: React.FC<ButtonProps> = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            type = "default",
            size = "middle",
            icon,
            onClick,
            loading,
            htmlType = "button",
            block = false,
            disabled = false,
            to,
            shape,
            autoFocus,
            style,
            form,
            className,
            children
        },
        ref
    ) => {
        const history = useHistory()

        const onClickHandler = (e: any) => {
            if (!loading) {
                to && history.push(to)
                onClick && onClick(e)
            }
        }

        return (
            <button
                ref={ref}
                form={form}
                style={style}
                autoFocus={autoFocus}
                type={htmlType}
                onClick={onClickHandler}
                disabled={disabled}
                className={`vl-btn ${btnStyle.btn} ${btnStyle[`btn-${type}`]} ${btnStyle[`btn-${size}`]} ${
                    block ? btnStyle[`btn-block`] : ""
                } ${shape ? btnStyle[`btn-circle`] : ""}` + className}
            >
                {loading ? (
                    <span className={btnStyle.icon}>
                        <LoadingOutlined />
                    </span>
                ) : (
                    icon && <span className={btnStyle.icon}>{icon}</span>
                )}
                {children}
            </button>
        )
    }
)

export default Button
