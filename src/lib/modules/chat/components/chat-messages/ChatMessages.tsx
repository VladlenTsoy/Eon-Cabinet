import React, {useEffect} from "react"
import styled from "styled-components"
import MessagesContainer from "./messages-container/MessagesContainer"
import InputsContainer from "./inputs-container/InputsContainer"
import {LoadingBlock} from "../../../../ui"
import {useCommonDispatch} from "../../../../../store/common/store"
import {fetchMessagesByChatId} from "../../reducer/messages/fetchMessagesByChatId"
import {useLoadingMessagesByChatId, useSelectMessagesByChatId} from "../../reducer/messages/messagesSelectors"

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
    const loading = useLoadingMessagesByChatId(chatId)
    const messages = useSelectMessagesByChatId(chatId)
    const dispatch = useCommonDispatch()

    useEffect(() => {
        const promise = dispatch(fetchMessagesByChatId({chatId}))
        return () => {
            promise.abort()
        }
    }, [dispatch])

    return <ChatMessageStyled>
        {
            loading && !messages.length ?
                <LoadingBlock/> :
                <MessagesContainer messages={messages} addPage={() => null} loading={loading}/>
        }
        <InputsContainer selectedContactId={chatId}/>
    </ChatMessageStyled>
}

export default ChatMessages