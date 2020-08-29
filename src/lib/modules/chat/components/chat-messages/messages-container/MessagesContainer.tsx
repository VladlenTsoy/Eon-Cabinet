import React from 'react';
import styled from "styled-components";
import Inbox from "./message/inbox/Inbox";
import Outbox from "./message/outbox/Outbox";

const MessagesContainerStyled = styled.div`
  padding-top: 0.5rem;
  height: 100%;
  background: ${props => props.theme['@layout-body-background']};
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`

interface MessagesContainerProps {

}

const MessagesContainer: React.FC<MessagesContainerProps> = () => {
    return <MessagesContainerStyled>
        <Inbox/>
        <Outbox/>
    </MessagesContainerStyled>
};

export default MessagesContainer;