import React from "react"
import style from "./ModalCard.module.css"
import {CloseOutlined} from "@ant-design/icons"

interface ModalCardProps {
    closable: boolean
    closeHandler: () => void
    title?: string
}

const ModalCard: React.FC<ModalCardProps> = ({
    children,
    title,
    closable,
    closeHandler
}) => {

    return (
        <div
            className={style.card}
        >
            {closable && (
                <button className={style.btnClose} onClick={closeHandler}>
                    <span className={style.iconClose}>
                        <CloseOutlined />
                    </span>
                </button>
            )}
            {title && (
                <div className={style.header}>
                    <div className={style.title}>{title}</div>
                </div>
            )}
            <div className={style.container}>{children}</div>
        </div>
    )
}

export default React.memo<React.FC<ModalCardProps>>(ModalCard)
