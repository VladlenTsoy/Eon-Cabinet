import React from "react"
import {LoadingOutlined} from "@ant-design/icons"
import {useHistory} from "react-router-dom"
import style from "./Button.module.css"

type ButtonType = React.ButtonHTMLAttributes<HTMLButtonElement>

export interface ButtonProps {
    type?: "default" | "primary" | "second" | "warning" | "ghost" | "link" | "danger"
    size?: "small" | "middle" | "large"
    icon?: React.ReactFragment
    onClick?: ButtonType["onClick"]
    htmlType?: ButtonType["type"]
    ref?: React.Ref<HTMLButtonElement>
    shape?: "circle"
    to?: string
    block?: boolean
    loading?: boolean
    disabled?: boolean
    autoFocus?: ButtonType["autoFocus"]
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
                autoFocus={autoFocus}
                type={htmlType}
                onClick={onClickHandler}
                disabled={disabled}
                className={`vl-btn ${style.btn} ${style[`btn-${type}`]} ${style[`btn-${size}`]} ${
                    block ? style[`btn-block`] : ""
                } ${shape ? style[`btn-circle`] : ""}`}
            >
                {loading ? (
                    <span className={style.icon}>
                        <LoadingOutlined />
                    </span>
                ) : (
                    icon && <span className={style.icon}>{icon}</span>
                )}
                {children}
            </button>
        )
    }
)

export default Button
