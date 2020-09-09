import React, {useEffect, useState} from "react"
import styled from "styled-components"
import MessagesContainer from "./messages-container/MessagesContainer"
import InputsContainer from "./inputs-container/InputsContainer"
import {useCommonDispatch} from "../../../../../store/common/store"
import {fetchMessagesByChatId} from "../../reducer/messages/fetchMessagesByChatId"
import {useCurrentPageMessagesByChatId} from "../../reducer/messages/messagesSelectors"

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
    const currentPage = useCurrentPageMessagesByChatId(chatId)
    const [page, setPage] = useState(currentPage)
    const dispatch = useCommonDispatch()

    useEffect(() => {
        const promise = dispatch(fetchMessagesByChatId({chatId, page}))
        return () => {
            promise.abort()
        }
    }, [dispatch, page])

    const clickMoreHandler = () => {
        setPage(prevState => ++prevState)
    }

    return <ChatMessageStyled>
        <MessagesContainer chatId={chatId} addPage={clickMoreHandler}/>
        <InputsContainer selectedContactId={chatId}/>
    </ChatMessageStyled>
}

export default ChatMessages