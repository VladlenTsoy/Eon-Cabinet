import React from 'react';
import styled from "styled-components"
import MessagesContainer from "./messages-container/MessagesContainer";
import InputsContainer from "./inputs-container/InputsContainer";

const ChatMessageStyled = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
`

interface ChatMessagesProps {
    contact: any
}

const ChatMessages: React.FC<ChatMessagesProps> = () => {
    return <ChatMessageStyled>
        <MessagesContainer/>
        <InputsContainer/>
    </ChatMessageStyled>
};

export default ChatMessages;