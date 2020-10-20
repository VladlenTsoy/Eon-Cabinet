import React, {useEffect} from "react"
import style from "./Notice.module.css"
import {CloseCircleFilled, ExclamationCircleFilled, CheckCircleFilled, InfoCircleFilled, LoadingOutlined} from "@ant-design/icons"

interface MessageProps {
    type: "success" | "error" | "info" | "warning" | "loading"
    duration?: number
    onClose?: () => void
    content: React.ReactNode | string
}

const Notice: React.FC<MessageProps> = ({duration = 1.5, content, type, onClose}) => {
    useEffect(() => {
        let timeout = setTimeout(() => {
            onClose && onClose()
        }, duration * 1000)
        return () => {
            clearTimeout(timeout)
        }
    }, [duration, onClose])

    return (
        <div className={style.wrapper}>
            <div className={style.notice}>
                <div className={style.message}>
                    <span className={`${style.icon} ${style[type]}`}>
                        {type === 'loading' && <LoadingOutlined/>}
                        {type === 'info' && <InfoCircleFilled/>}
                        {type === 'success' && <CheckCircleFilled/>}
                        {type === 'warning' && <ExclamationCircleFilled/>}
                        {type === 'error' && <CloseCircleFilled/>}
                    </span>
                    <span>{content}</span>
                </div>
            </div>
        </div>
    )
}

export default Notice
