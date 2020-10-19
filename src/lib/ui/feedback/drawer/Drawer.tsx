import React, {useEffect} from "react"
import Portal from "../modal/portal/Portal"
import Mask from "../modal/mask/Mask"
import _style from "./Drawer.module.css"

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
    closable = true,
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
    }

    return (
        <Portal visible={visible} getContainer={getContainer} destroyOnClose={destroyOnClose}>
            <div className={`${_style.drawer} ${visible ? _style.open : ""}`} style={{zIndex}} tabIndex={-1}>
                {mask && <Mask visible={visible} closeHandler={closeHandler} />}
                <div
                    className={`${_style.drawerContent} ${_style[placement]} ${visible ? "" : _style.back}`}
                    style={{width, ...style}}
                >
                    {children}
                </div>
            </div>
        </Portal>
    )
}

export default _Drawer
