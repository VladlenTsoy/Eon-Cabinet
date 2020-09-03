import React from "react"
import styled from "styled-components"
import MessagesContainer from "./messages-container/MessagesContainer"
import InputsContainer from "./inputs-container/InputsContainer"
import {Contact} from "../../interfaces/Contact"

const ChatMessageStyled = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

interface ChatMessagesProps {
    contact: Contact
}

const ChatMessages: React.FC<ChatMessagesProps> = ({contact}) => {
    return <ChatMessageStyled>
        <MessagesContainer contact={contact}/>
        <InputsContainer contactId={contact.id}/>
    </ChatMessageStyled>
}

export default ChatMessages