import React, {useEffect} from "react"
import styled from "styled-components"
import MessagesContainer from "./messages-scroll/MessagesScroll"
import InputsContainer from "./inputs-container/InputsContainer"
import socket from "../../../../../utils/socket"
import {useUser} from "../../../../../hooks/use-user"
import {useSelectNewMessagesByChatIdAndUserId} from "../../reducer/messages/messagesSelectors"
import {updateMessages} from "../../reducer/messages/messagesSlice"
import {useCommonDispatch} from "../../../../../store/common/store"

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
    const dispatch = useCommonDispatch()
    const messages = useSelectNewMessagesByChatIdAndUserId(chatId, userId)

    useEffect(() => {
        if (messages.length)
            dispatch(updateMessages(messages))
    }, [messages])

    useEffect(() => {
        socket.emit("joined_the_chat", {chatId, userId})
        return () => {
            socket.emit("left_the_chat", {chatId, userId})
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
