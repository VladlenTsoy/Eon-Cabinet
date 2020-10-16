import React from "react"
import {LoadingOutlined} from "@ant-design/icons"
import {useHistory} from "react-router-dom"
import style from "./Button.module.css"

interface ButtonStyledProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    block: boolean
}

interface ButtonProps {
    type?: "default" | "primary" | "second" | "warning" | "ghost" | "link"
    size?: "small" | "middle" | "large"
    icon?: React.ReactFragment
    onClick?: ButtonStyledProps["onClick"]
    htmlType?: ButtonStyledProps["type"]
    shape?: "circle"
    to?: string
    block?: boolean
    loading?: boolean
    disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
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
    children
}) => {
    const history = useHistory()

    const onClickHandler = (e: any) => {
        to && history.push(to)
        onClick && onClick(e)
    }

    return (
        <button
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

export default React.memo<React.FC<ButtonProps>>(Button)
