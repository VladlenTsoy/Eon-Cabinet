import React from "react"
import styled from "styled-components"
import {Drawer} from "../../../ui"
import {Badge} from "antd"
import {useScreenWindow} from "../../../../hooks/use-screen-window.effect"
import Notifications from "./Notifications"

const NotificationsDrawStyled = styled(Drawer)`
    .ant-drawer-wrapper-body .ant-drawer-body {
        padding: 0;
    }
`

interface NotificationsButtonProps {
    visible: boolean
    close: () => void
}

const NotificationsButton:React.FC<NotificationsButtonProps> = ({children, close, visible}) => {
    const [, breakpoint] = useScreenWindow({breakpoint: "sm"})

    return (
        <div>
            <Badge count={1}>
                {children}
            </Badge>
            <NotificationsDrawStyled
                width={breakpoint ? "100%" : 480}
                getContainer=".draw-container"
                style={{position: "absolute"}}
                closable={false}
                mask={false}
                visible={visible}
                onClose={close}
                zIndex={3}
                notFooter
            >
                <Notifications/>
            </NotificationsDrawStyled>
        </div>
    )
}

export default NotificationsButton