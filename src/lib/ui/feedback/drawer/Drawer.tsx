import React from "react"
import Portal from "../modal/portal/Portal"
import Mask from "../modal/mask/Mask"
import styled from "./Drawer.module.css"
import Wrapper from "../modal/wrapper/Wrapper"
import DrawerCard from "./drawer-card/DrawerCard"

interface _DrawerProps {
    title?: React.ReactNode
    width?: string | number
    visible: boolean
    closable?: boolean
    zIndex?: number
    onClose: () => void
    getContainer?: string
    style?: any
    mask?: boolean
    placement?: "top" | "right" | "bottom" | "left"
    afterVisibleChange?: (visible: boolean) => void
    destroyOnClose?: boolean
    footer?: React.ReactNode
    notFooter?: any
}

const _Drawer: React.FC<_DrawerProps> = ({
    children,
    visible = false,
    onClose,
    width = 256,
    // closable = true,
    zIndex = 1000,
    getContainer,
    style,
    mask = true,
    placement = "right",
    afterVisibleChange,
    destroyOnClose = false
}) => {
    const closeHandler = async () => {
        onClose()
        setTimeout(() => afterVisibleChange && afterVisibleChange(visible), 300)
    }

    return (
        <Portal visible={visible} getContainer={getContainer} destroyOnClose={destroyOnClose}>
            <div>
                {mask && <Mask visible={visible} />}
                <Wrapper
                    visible={visible}
                    closeHandler={closeHandler}
                    style={{...style, pointerEvents: mask ? "all" : "none"}}
                    zIndex={zIndex}
                >
                    <div
                        className={`${styled.drawer} ${visible ? styled.open : styled.back} ${
                            styled[placement]
                        } `}
                        style={{width}}
                    >
                        <DrawerCard>{children}</DrawerCard>
                    </div>
                </Wrapper>
            </div>
        </Portal>
    )
}

export default _Drawer
