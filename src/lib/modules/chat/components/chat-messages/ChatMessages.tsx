import React from "react"
import styled from "styled-components"
import MessagesContainer from "./messages-scroll/MessagesScroll"
import InputsContainer from "./inputs-container/InputsContainer"

const ChatMessageStyled = styled.div`
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
`

interface ChatMessagesProps {
    chatId: number
}

const ChatMessages: React.FC<ChatMessagesProps> = ({chatId}) => {
    return (
        <ChatMessageStyled>
            <MessagesContainer chatId={chatId}/>
            <InputsContainer selectedContactId={chatId}/>
        </ChatMessageStyled>
    )
}

export default ChatMessages
