import React, {useEffect} from "react"
import styled from "styled-components"
import MessagesContainer from "./messages-scroll/MessagesScroll"
import InputsContainer from "./inputs-container/InputsContainer"
import socket from "../../../../../utils/socket"
import {useUser} from "../../../../../hooks/use-user"

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
    const {userId} = useUser()

    useEffect(() => {
        socket.emit('joined_the_chat', {chatId, userId})

        return() => {
            socket.emit('left_the_chat', {chatId, userId})
        }
    }, [chatId, userId])

    return (
        <ChatMessageStyled>
            <MessagesContainer chatId={chatId}/>
            <InputsContainer selectedContactId={chatId}/>
        </ChatMessageStyled>
    )
}

export default ChatMessages
