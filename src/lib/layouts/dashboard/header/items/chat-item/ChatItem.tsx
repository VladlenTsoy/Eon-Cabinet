import React, {useCallback, useState} from "react"
import {Badge, Button} from "antd"
import {Drawer} from "../../../../../ui"
import {MessageFilled} from "@ant-design/icons"
import Chat from "../../../../../modules/chat/components/Chat"
import {useScreenWindow} from "../../../../../../hooks/use-screen-window.effect"
import styled from "styled-components"

const ChatDrawStyled = styled(Drawer)`
    .ant-drawer-wrapper-body .ant-drawer-body {
        padding: 0;
    }
`

const ChatItem: React.FC = () => {
    const [visible, setVisible] = useState(false)
    const [, breakpoint] = useScreenWindow({breakpoint: "sm"})

    const toggle = () => setVisible(!visible)
    const close = useCallback(() => setVisible(false), [])

    return (
        <>
            <Badge count={5}>
                <Button
                    type={visible ? "primary" : "default"}
                    shape="circle"
                    onClick={toggle}
                    icon={<MessageFilled />}
                />
            </Badge>
            <ChatDrawStyled
                width={breakpoint ? "100%" : 480}
                getContainer=".draw-container"
                style={{position: "absolute"}}
                closable={false}
                mask={false}
                visible={visible}
                onClose={close}
                zIndex={4}
                notFooter
            >
                <Chat close={close}/>
            </ChatDrawStyled>
        </>
    )
}

export default React.memo(ChatItem)
