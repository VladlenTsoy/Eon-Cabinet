import * as React from "react"
import ReactDOM from "react-dom"
import ModalConfirm from "../lib/ui/modal-confirm/ModalConfirm"

interface ParamsProps {
    title: string
    content?: React.ReactNode
    type?: "info" | "success" | "error" | "warning" | "confirm"
    onOk?: (...args: any[]) => any
    onCancel?: (...args: any[]) => any
}

type MessageProps = (params: ParamsProps) => void

export const confirm: MessageProps = async ({type = "confirm", content, title, onCancel, onOk}) => {
    return await new Promise((resolve) => {
        const modal = document.createElement("div")

        const destroy = () => {
            const unmountResult = ReactDOM.unmountComponentAtNode(modal)
            if (unmountResult && modal.parentNode) document.body.removeChild(modal)
        }

        const onCancelHandler = async () => {
            onCancel && await onCancel()
            resolve(false)
            destroy()
        }

        const onOkHandler = async () => {
            onOk && await onOk()
            resolve(true)
            destroy()
        }

        setTimeout(() => {
            document.body.appendChild(modal)
            ReactDOM.render(
                <ModalConfirm
                    title={title}
                    onCancel={onCancelHandler}
                    onOk={onOkHandler}
                    content={content}
                    type={type}
                />,
                modal
            )
        })
    })
}
