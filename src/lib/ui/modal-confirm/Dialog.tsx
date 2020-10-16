import * as React from "react"
import {ButtonProps} from "../button/Button"
import ReactDOM from "react-dom"
import ModalConfirm from "./ModalConfirm"

export interface DialogParamsProps {
    title: string
    icon?: React.ReactNode
    content?: React.ReactNode
    okType?: ButtonProps["type"]
    okText: string
    cancelText?: string
    onOk?: (...args: any[]) => any
    onCancel?: (...args: any[]) => any
}

type DialogProps = (params: DialogParamsProps) => Promise<boolean>

export const Digital: DialogProps = async ({
    content,
    title,
    onCancel,
    onOk,
    cancelText,
    okText,
    okType,
    icon
}) => {
    return await new Promise(resolve => {
        const modal = document.createElement("div")

        const destroy = () => {
            const unmountResult = ReactDOM.unmountComponentAtNode(modal)
            document.body.style.removeProperty("width")
            document.body.style.removeProperty("overflow")
            if (unmountResult && modal.parentNode) document.body.removeChild(modal)
        }

        setTimeout(() => {
            if (document.body.scrollHeight > document.body.clientHeight)
                document.body.style.width = "calc(100% - 17px)"
            document.body.style.overflow = "hidden"
            document.body.appendChild(modal)
            ReactDOM.render(
                <ModalConfirm
                    title={title}
                    onCancel={onCancel}
                    resolve={resolve}
                    destroy={destroy}
                    onOk={onOk}
                    content={content}
                    icon={icon}
                    okText={okText}
                    okType={okType}
                    cancelText={cancelText}
                />,
                modal
            )
        })
    })
}
