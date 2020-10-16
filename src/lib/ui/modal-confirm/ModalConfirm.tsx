import React, {useState} from "react"
import {QuestionCircleOutlined} from "@ant-design/icons"
import {Button} from "lib/ui"
import style from "./Modal.module.css"

interface ModalConfirmProps {
    title: string
    content?: React.ReactNode
    type?: "info" | "success" | "error" | "warning" | "confirm"
    onOk: () => Promise<void>
    onCancel: () => Promise<void>
}

const ModalConfirm: React.FC<ModalConfirmProps> = ({title, type, content, onCancel, onOk}) => {
    const [okLoading, setOkLoading] = useState(false)
    const [classes, setClasses] = useState("fadeIn")

    const fadeOutAnimation = async (func: any) => {
        setClasses("fadeOut")
        setTimeout(async () => {
            await func()
        }, 300)
    }

    const closeHandler = async (e: any) => {
        if (e.currentTarget === e.target && !okLoading)
            await fadeOutAnimation(onCancel)
    }

    const okHandler = async (e: any) => {
        e.preventDefault()
        setOkLoading(true)
        await fadeOutAnimation(onOk)
    }

    return (
        <div className={`${classes} ${style.dialog}`}>
            <div className={style.confirmCard}>
                <div>
                    <div>
                        <div className={style.confirmContainerIcon}><QuestionCircleOutlined/></div>
                        <span className={style.confirmContainerTitle}>{title}</span>
                        <div className={style.confirmContainerContent}>{content}</div>
                    </div>
                    <div className={style.confirmActions}>
                        <Button onClick={closeHandler} disabled={okLoading}>Нет</Button>
                        <Button type="primary" onClick={okHandler} loading={okLoading}>Да</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalConfirm
