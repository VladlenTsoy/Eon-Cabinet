import * as React from "react"
import ReactDOM from "react-dom"
import Notice from "./Notice"

interface ParamsProps {
    type: "info" | "success" | "error" | "warning" | "loading"
    content: string | number
    key?: string
    duration?: number
}

type MessageProps = (params: ParamsProps) => void

export const message: MessageProps = ({type, content, duration = 3}) => {
    const modal = document.createElement("div")

    const destroy = () => {
        const unmountResult = ReactDOM.unmountComponentAtNode(modal)
        if (unmountResult && modal.parentNode) document.body.removeChild(modal)
    }

    setTimeout(() => {
        document.body.appendChild(modal)
        ReactDOM.render(
            <Notice type={type} content={content} onClose={destroy} duration={duration} />,
            modal
        )
    })
}
