import React, {useCallback} from "react"
import {useUser} from "../../../../hooks/use-user"
import {useScreenWindow} from "../../../../hooks/use-screen-window.effect"
import {useSelectedChatId} from "../reducer/chats/chatsSelectors"
import {useChatListeningMessage} from "../hooks/useChatListeningMessage"
import socket from "../../../../utils/socket"
import {Badge} from "antd"
import Chat from "./Chat"
import styled from "styled-components"
import {Drawer} from "../../../ui"

const ChatDrawStyled = styled(Drawer)`
    .ant-drawer-wrapper-body .ant-drawer-body {
        padding: 0;
    }
`

interface ChatButtonProps {
    visible: boolean
    close: () => void
}

const ChatButton: React.FC<ChatButtonProps> = ({children, close, visible}) => {
    const {userId} = useUser()
    const [, breakpoint] = useScreenWindow({breakpoint: "sm"})
    const selectedChatId = useSelectedChatId()
    const countNewMessages = useChatListeningMessage({userId})

    const closeHandler = useCallback((visible: boolean) => {
        if (!visible && selectedChatId)
            socket.emit("left_the_chat", {chatId: selectedChatId, userId})
    }, [selectedChatId, userId])

    return <div>
        <Badge count={countNewMessages}>
            {children}
        </Badge>
        <ChatDrawStyled
            width={breakpoint ? "100%" : 480}
            getContainer=".draw-container"
            style={{position: "absolute"}}
            closable={false}
            mask={false}
            visible={visible}
            afterVisibleChange={closeHandler}
            onClose={close}
            zIndex={4}
            notFooter
        >
            <Chat close={close}/>
        </ChatDrawStyled>
    </div>
}

export default ChatButton