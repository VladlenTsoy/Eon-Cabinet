import React, {useEffect, useRef, useState} from "react"
import {QuestionCircleOutlined} from "@ant-design/icons"
import {Button} from "lib/ui"
import style from "./Modal.module.css"
import {ConfirmParamsProps} from "../../../utils/confirm"

interface ModalConfirmProps {
    title: string
    content?: React.ReactNode
    resolve: (response: any) => void
    destroy: () => void
    icon?: ConfirmParamsProps["icon"]
    okType?: ConfirmParamsProps["okType"]
    onOk?: ConfirmParamsProps["onOk"]
    onCancel?: ConfirmParamsProps["onOk"]
    okText: ConfirmParamsProps["okText"]
    cancelText: ConfirmParamsProps["cancelText"]
}

const ModalConfirm: React.FC<ModalConfirmProps> = ({
    title,
    icon,
    okType = "primary",
    content,
    onCancel,
    onOk,
    cancelText,
    okText,
    resolve,
    destroy
}) => {
    const wrapperRef = useRef<HTMLDivElement>(null)
    const okButtonRef = useRef<HTMLButtonElement>(null)
    const [okLoading, setOkLoading] = useState(false)
    const [classes, setClasses] = useState("fadeIn")

    const fadeOutAnimation = async () => {
        setClasses("fadeOut")
        setOkLoading(false)
        setTimeout(async () => {
            destroy()
        }, 300)
    }

    const closeHandler = async () => {
        if (!okLoading) {
            onCancel && (await onCancel())
            resolve(false)
            await fadeOutAnimation()
        }
    }

    const okHandler = async () => {
        setOkLoading(!!onOk)
        onOk && (await onOk())
        resolve(true)
        await fadeOutAnimation()
    }

    const onWrapperKeyDown = async (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Escape") {
            e.stopPropagation()
            await closeHandler()
            return
        }
    }

    useEffect(() => {
        if (wrapperRef.current) wrapperRef.current.focus()
        if (okButtonRef.current) okButtonRef.current.focus()
    }, [wrapperRef.current, okButtonRef.current])

    return (
        <div
            className={`${classes} ${style.dialog}`}
            onKeyDown={onWrapperKeyDown}
            role="dialog"
            tabIndex={-1}
            ref={wrapperRef}
        >
            <div className={style.confirmCard}>
                <div>
                    <div>
                        <div className={style.confirmContainerIcon}>{icon || <QuestionCircleOutlined />}</div>
                        <span className={style.confirmContainerTitle}>{title}</span>
                        <div className={style.confirmContainerContent}>{content}</div>
                    </div>
                    <div className={style.confirmActions}>
                        <Button onClick={closeHandler} disabled={okLoading}>
                            {cancelText}
                        </Button>
                        <Button type={okType} onClick={okHandler} loading={okLoading} ref={okButtonRef}>
                            {okText}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalConfirm
