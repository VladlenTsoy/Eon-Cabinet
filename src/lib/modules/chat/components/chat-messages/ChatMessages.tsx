import React from "react"
import styled from "styled-components"
import MessagesContainer from "./messages-container/MessagesContainer"
import InputsContainer from "./inputs-container/InputsContainer"
import {useSelectMessages} from "../../hooks/useSelectMessages"
import {LoadingBlock} from "../../../../ui"
import {useUser} from "../../../../../hooks/use-user"

const ChatMessageStyled = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

interface ChatMessagesProps {
    selectedContactId: number
}

const ChatMessages: React.FC<ChatMessagesProps> = ({selectedContactId}) => {
    const {user} = useUser()
    const [loading, messages, addPage] = useSelectMessages({selectedContactId, userId: user.id})

    return <ChatMessageStyled>
        {
            loading && !messages.length ?
                <LoadingBlock/> :
                <MessagesContainer messages={messages} addPage={addPage} loading={loading}/>
        }
        <InputsContainer selectedContactId={selectedContactId}/>
    </ChatMessageStyled>
}

export default ChatMessages