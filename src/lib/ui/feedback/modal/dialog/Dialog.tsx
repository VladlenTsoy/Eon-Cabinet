import React, {useCallback, useState} from "react"
import Confirm from "./confirm/Confirm"
import Mask from "../mask/Mask"
import {CallDialogParamsProps} from "./callDialog"
import Wrapper from "../wrapper/Wrapper"
import WrapperCard from "../wrapper-card/WrapperCard"

interface DialogWrapperProps extends CallDialogParamsProps {
    destroy: () => void
    mask?: boolean
    centered?: boolean
    resolve: (response: any) => void
}

const Dialog: React.FC<DialogWrapperProps> = ({
    title,
    icon,
    okType = "primary",
    content,
    onCancel,
    onOk,
    cancelText,
    okText,
    resolve,
    zIndex,
    mask = true,
    centered = false,
    destroy
}) => {
    const [visible, setVisible] = useState(true)
    const [okLoading, setOkLoading] = useState(false)

    const fadeOutAnimation = useCallback(async () => {
        setOkLoading(false)
        setVisible(false)
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
    }, [onCancel, resolve, fadeOutAnimation, okLoading])

    const okHandler = useCallback(async () => {
        setOkLoading(!!onOk)
        onOk && (await onOk())
        resolve(true)
        await fadeOutAnimation()
    }, [onOk, resolve, fadeOutAnimation])

    return (
        <div>
            {mask && <Mask visible={visible} />}
            <Wrapper
                visible={visible}
                closeHandler={closeHandler}
                maskClosable={false}
                zIndex={zIndex}
                centered={centered}
            >
                <WrapperCard width={500} visible={visible} centered={centered}>
                    <Confirm
                        title={title}
                        okLoading={okLoading}
                        closeHandler={closeHandler}
                        okHandler={okHandler}
                        content={content}
                        icon={icon}
                        okText={okText}
                        okType={okType}
                        cancelText={cancelText}
                    />
                </WrapperCard>
            </Wrapper>
        </div>
    )
}

export default Dialog
