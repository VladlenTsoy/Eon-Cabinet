import React from "react"
import Mask from "./mask/Mask"
import Portal from "./portal/Portal"
import Wrapper from "./wrapper/Wrapper"
import ModalCard from "./modal-card/ModalCard"
import WrapperCard from "./wrapper-card/WrapperCard"

interface ModalProps {
    title?: string
    width?: string | number
    visible: boolean
    centered?: boolean
    closable?: boolean
    maskClosable?: boolean
    zIndex?: number
    mask?: boolean
    onCancel: () => void
}

const Modal: React.FC<ModalProps> = ({
    children,
    title,
    centered = false,
    closable = true,
    maskClosable = true,
    mask = true,
    width = 416,
    visible,
    zIndex,
    onCancel
}) => {
    const closeHandler = async () => {
        onCancel()
    }

    return (
        <Portal visible={visible}>
            <div>
                {mask && <Mask visible={visible} />}
                <Wrapper
                    closeHandler={closeHandler}
                    centered={centered}
                    visible={visible}
                    zIndex={zIndex}
                    maskClosable={maskClosable}
                >
                    <WrapperCard visible={visible} centered={centered} width={width}>
                        <ModalCard closable={closable} closeHandler={closeHandler} title={title}>
                            {children}
                        </ModalCard>
                    </WrapperCard>
                </Wrapper>
            </div>
        </Portal>
    )
}

export default Modal
