import * as React from "react"
import {ButtonProps} from "../../../general/button/Button"
import ReactDOM from "react-dom"
import Dialog from "./Dialog"

export interface CallDialogParamsProps {
    type?: "error"
    title: string
    icon?: React.ReactNode
    content?: React.ReactNode
    okType?: ButtonProps["type"]
    okText: string
    cancelText?: string
    zIndex?: number
    mask?: boolean
    centered?: boolean
    onOk?: (...args: any[]) => any
    onCancel?: (...args: any[]) => any
}

type CallDialogProps = (params: CallDialogParamsProps) => Promise<boolean>

export const Digital: CallDialogProps = async ({
    content,
    title,
    onCancel,
    onOk,
    cancelText,
    okText,
    okType,
    icon,
    zIndex,
    mask,
    centered
}) => {
    return await new Promise(resolve => {
        const modal = document.createElement("div")

        const destroy = () => {
            const unmountResult = ReactDOM.unmountComponentAtNode(modal)
            if (unmountResult && modal.parentNode) document.body.removeChild(modal)
        }

        setTimeout(() => {
            document.body.appendChild(modal)
            ReactDOM.render(
                <Dialog
                    zIndex={zIndex}
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
                    mask={mask}
                    centered={centered}
                />,
                modal
            )
        })
    })
}
