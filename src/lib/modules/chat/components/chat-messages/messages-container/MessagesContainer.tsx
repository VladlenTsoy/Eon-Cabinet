import React, {useEffect} from "react"
import styled from "styled-components"
import {useUser} from "../../../../../../hooks/use-user"
import MessageComponent from "./message/Message"
import {
    useSelectMessagesByChatId,
    useCurrentPageMessagesByChatId,
    useLastPageMessagesByChatId
} from "../../../reducer/messages/messagesSelectors"
import {Chat} from "../../../interfaces/Chat"
import LoadingBlock from "./loading-block/LoadingBlock"

const MessagesContainerStyled = styled.div`
    padding-top: 0.5rem;
    height: 100%;
    background: ${(props) => props.theme["@layout-body-background"]};
    overflow-x: hidden;
    overflow-y: scroll;

    .container {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }
`

interface MessagesContainerProps {
    chatId: Chat["chat_id"]
    addPage: () => void
}

const MessagesContainer: React.FC<MessagesContainerProps> = ({
    chatId,
    addPage
}) => {
    const {user} = useUser()
    const messages = useSelectMessagesByChatId(chatId)
    const currentPage = useCurrentPageMessagesByChatId(chatId)
    const lastPage = useLastPageMessagesByChatId(chatId)

    useEffect(() => {
        if (messages.length) {
            const scrollBlock = document.getElementById("scroll-chat")
            if (scrollBlock) scrollBlock.scrollTop = scrollBlock.scrollHeight
        }
    }, [messages])

    const scrollHandler = (event: any) => {
        if (event.target.scrollTop === 0 && lastPage > currentPage) addPage()
    }

    return (
        <MessagesContainerStyled
            id="scroll-chat"
            className="fadeIn animated"
            onScroll={scrollHandler}
        >
            <LoadingBlock chatId={chatId} />
            <div className="container">
                {messages.map((message) => (
                    <MessageComponent
                        message={message}
                        type={user.id === message.user_id ? "outbox" : "inbox"}
                        key={message.id}
                    />
                ))}
            </div>
        </MessagesContainerStyled>
    )
}

export default React.memo(MessagesContainer)
