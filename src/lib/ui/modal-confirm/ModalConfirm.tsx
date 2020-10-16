import React, {useCallback, useEffect, useRef, useState} from "react"
import {QuestionCircleOutlined} from "@ant-design/icons"
import style from "./Modal.module.css"
import {DialogParamsProps} from "./Dialog"
import Actions from "./actions/Actions"

interface ModalConfirmProps {
    title: string
    content?: React.ReactNode
    resolve: (response: any) => void
    destroy: () => void
    icon?: DialogParamsProps["icon"]
    okType?: DialogParamsProps["okType"]
    onOk?: DialogParamsProps["onOk"]
    onCancel?: DialogParamsProps["onOk"]
    okText: DialogParamsProps["okText"]
    cancelText?: DialogParamsProps["cancelText"]
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
    const [okLoading, setOkLoading] = useState(false)
    const [classes, setClasses] = useState("fadeIn")

    const fadeOutAnimation = useCallback(async () => {
        setClasses("fadeOut")
        setOkLoading(false)
        setTimeout(async () => {
            destroy()
        }, 300)
    }, [destroy])

    const closeHandler = useCallback(async () => {
        if (!okLoading) {
            onCancel && (await onCancel())
            resolve(false)
            await fadeOutAnimation()
        }
    }, [onCancel, resolve])

    const okHandler = useCallback(async () => {
        setOkLoading(!!onOk)
        onOk && (await onOk())
        resolve(true)
        await fadeOutAnimation()
    }, [onOk, resolve, fadeOutAnimation])

    const onWrapperKeyDown = async (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Escape") {
            e.stopPropagation()
            await closeHandler()
            return
        }
    }

    useEffect(() => {
        if (wrapperRef.current) wrapperRef.current.focus()
    }, [wrapperRef.current])

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
                    <Actions
                        okLoading={okLoading}
                        okText={okText}
                        okType={okType}
                        okHandler={okHandler}
                        closeHandler={closeHandler}
                        cancelText={cancelText}
                    />
                </div>
            </div>
        </div>
    )
}

export default ModalConfirm
