import React from "react"
import {LoadingOutlined} from "@ant-design/icons"
import styled from "styled-components"

interface ButtonStyledProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    block: boolean
}

const ButtonStyled: React.FC<ButtonStyledProps> = styled.button<
    ButtonStyledProps
>`
    &.vl-button {
        position: relative;
        display: inline-block;
        height: 32px;
        margin: 0;
        padding: 0 15px;
        font-size: 14px;
        background: ${(props) => props.theme["@component-background"]};
        border-radius: 10px;
        border: 1px solid ${(props) => props.theme.light_color_border};
        cursor: pointer;
        transition: color 0.3s, background 0.3s, border-color 0.3s,
            box-shadow 0.3s;
        outline: none;
        width: ${(props) => (props.block ? "100%" : "auto")};
        line-height: 1.5715;

        :hover {
            color: ${(props) => props.theme.color_primary};
            border: 1px solid ${(props) => props.theme.color_primary};
        }

        :active {
            color: ${(props) => props.theme.color_primary};
            border: 1px solid ${(props) => props.theme.color_primary};
            animation: clickAnimate 0.2s ease-in-out;
        }
    }

    @keyframes clickAnimate {
        from {
            box-shadow: 0 0 0 2.5px ${(props) => props.theme.color_primary}26;
        }
        to {
            box-shadow: 0 0 0 5px ${(props) => props.theme.color_primary}00;
        }
    }

    &.vl-button-type-second {
        border: 0;
        background: ${(props) => props.theme["@layout-body-background"]};

        :hover {
            color: ${(props) => props.theme.color_black};
            border: 0;
        }
    }

    &.vl-button-type-primary {
        border: 0;
        color: #ffffff;
        background: ${(props) => props.theme.color_primary};

        :hover {
            background: ${(props) => props.theme.color_primary}cc;
            color: #ffffff;
            border: 0;
        }
    }

    &.vl-button-type-warning {
        border: 0;
        color: #ffffff;
        background: ${(props) => props.theme.color_warning};
        box-shadow: 0 5px 10px 0 rgba(0,0,0,0.1);

        :hover {
            background: ${(props) => props.theme.color_warning}cc;
            color: #ffffff;
            border: 0;
        }
    }

    &.vl-button-size-large {
        height: 40px;
        font-size: 16px;
        //line-height: 38px;
    }

    &.vl-button-circle {
        padding: 4.9px 0;
        border-radius: 50%;

        .vl-button-icon {
            margin-right: 0;
        }

        &.vl-button-size-large {
            min-width: 40px;
        }
    }

    .vl-button-icon {
        display: inline-block;
        margin-right: 0.5rem;
    }
`

interface ButtonProps {
    type?: "default" | "primary" | "second" | "warning"
    size?: "small" | "middle" | "large"
    icon?: React.ReactFragment
    onClick?: ButtonStyledProps["onClick"]
    htmlType?: ButtonStyledProps["type"]
    shape?: "circle"
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
    shape,
    children
}) => {
    return (
        <ButtonStyled
            type={htmlType}
            block={block}
            onClick={onClick}
            disabled={disabled}
            className={`vl-button vl-button-type-${type} vl-button-size-${size} ${
                shape && `vl-button-${shape}`
            }`}
        >
            {loading ? (
                <span className="vl-button-icon">
                    <LoadingOutlined />
                </span>
            ) : (
                icon && <span className="vl-button-icon">{icon}</span>
            )}
            {children}
        </ButtonStyled>
    )
}

export default Button
