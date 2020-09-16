import React, {useCallback, useState} from "react"
import {MessageFilled} from '@ant-design/icons';
import {SidebarButton, SidebarBadge} from '../sidebar-button/SidebarButton';
import {useUser} from "../../../../../../hooks/use-user"
import {useScreenWindow} from "../../../../../../hooks/use-screen-window.effect"
import {useSelectedChatId} from "../../../../../modules/chat/reducer/chats/chatsSelectors"
import {useChatListeningMessage} from "../../../../../modules/chat/hooks/useChatListeningMessage"
import socket from "../../../../../../utils/socket"
import Chat from "../../../../../modules/chat/components/Chat"
import styled from "styled-components"
import {Drawer} from "../../../../../ui"

const ChatDrawStyled = styled(Drawer)`
    .ant-drawer-wrapper-body .ant-drawer-body {
        padding: 0;
    }
`

const ChatItem = () => {
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

    return <div>
        <SidebarBadge count={countNewMessages}>
            <SidebarButton active={visible} onClick={visible ? close : open}>
                <MessageFilled/>
            </SidebarButton>
        </SidebarBadge>
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
    </div>
}

export default ChatItem