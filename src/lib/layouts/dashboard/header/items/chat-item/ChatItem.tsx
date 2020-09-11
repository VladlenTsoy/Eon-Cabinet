import React, {useCallback, useState} from "react"
import {Badge, Button} from "antd"
import {Drawer} from "../../../../../ui"
import {MessageFilled} from "@ant-design/icons"
import Chat from "../../../../../modules/chat/components/Chat"
import {useScreenWindow} from "../../../../../../hooks/use-screen-window.effect"
import styled from "styled-components"
import {useChatListeningMessage} from "../../../../../modules/chat/hooks/useChatListeningMessage"
import {useUser} from "../../../../../../hooks/use-user"
import {useSelectedChatId} from "../../../../../modules/chat/reducer/chats/chatsSelectors"
import socket from "../../../../../../utils/socket"

const ChatDrawStyled = styled(Drawer)`
    .ant-drawer-wrapper-body .ant-drawer-body {
        padding: 0;
    }
`

const ChatItem: React.FC = () => {
    const {userId} = useUser()
    const [visible, setVisible] = useState(false)
    const [, breakpoint] = useScreenWindow({breakpoint: "sm"})
    const selectedChatId = useSelectedChatId()
    const countNewMessages = useChatListeningMessage({userId})

    const open = () => setVisible(true)
    const close = useCallback(() => {
        setVisible(false)
        if (selectedChatId)
            socket.emit("left_the_chat", {chatId: selectedChatId, userId})
    }, [selectedChatId, userId])

    return (
        <>
            <Badge count={countNewMessages}>
                <Button
                    type={visible ? "primary" : "default"}
                    shape="circle"
                    onClick={visible ? close : open}
                    icon={<MessageFilled/>}
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
