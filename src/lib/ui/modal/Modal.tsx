import React from "react"
import {CloseOutlined} from "@ant-design/icons"
import style from "./Modal.module.css"
import Mask from "./mask/Mask"
import Portal from "./portal/Portal"

interface ModalProps {
    title?: string
    width?: string | number
    visible: boolean
    centered?: boolean
    closable?: boolean
    zIndex?: number
    onCancel: () => void
}

const Modal: React.FC<ModalProps> = ({
    children,
    title,
    centered,
    closable = true,
    width = 416,
    visible,
    zIndex,
    onCancel
}) => {
    const closeHandler = async () => {
        onCancel()
    }

    const _width = typeof width === "number" ? width + "px" : width

    return (
        <Portal visible={visible}>
            <Mask closeHandler={closeHandler} centered={centered} visible={visible} zIndex={zIndex}>
                <div className={style.modal} role="document" style={{maxWidth: _width}}>
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
            </Mask>
        </Portal>
    )
}

export default Modal
