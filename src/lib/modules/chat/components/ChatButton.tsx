import React, {useCallback} from "react"
import {useUser} from "../../../../hooks/use-user"
import {useScreenWindow} from "../../../../hooks/use-screen-window.effect"
import {useSelectedChatId} from "../reducer/chats/chatsSelectors"
import {useChatListeningMessage} from "../hooks/useChatListeningMessage"
import socket from "../../../../utils/socket"
import {Badge} from "antd"
import styled from "styled-components"
import {Drawer, LoadingBlock} from "../../../ui"

const Chat = React.lazy(() => import("./Chat"))

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

    const closeHandler = useCallback(
        (visible: boolean) => {
            if (!visible && selectedChatId)
                socket.emit("left_the_chat", {chatId: selectedChatId, userId})
        },
        [selectedChatId, userId]
    )

    return (
        <div>
            <Badge count={countNewMessages}>{children}</Badge>
            <ChatDrawStyled
                width={breakpoint ? "100%" : 480}
                closable={false}
                mask={false}
                visible={visible}
                afterVisibleChange={closeHandler}
                onClose={close}
                notFooter
                {...(!breakpoint
                    ? {
                          getContainer: ".draw-container",
                          style: {position: "absolute"},
                          zIndex: 4
                      }
                    : {zIndex: 1004})}
            >
                <React.Suspense fallback={<LoadingBlock/>}>
                    <Chat close={close} />
                </React.Suspense>
            </ChatDrawStyled>
        </div>
    )
}

export default ChatButton
