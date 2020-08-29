import React from 'react';
import styled from "styled-components";
import {MessageStyled, WrapperMessageStyled} from "../Message";

const WrapperInboxStyled = styled(WrapperMessageStyled)`
  justify-content: flex-start;
  padding-left: 0.5rem;
`

const InboxStyled = styled(MessageStyled)`
  background: ${props => props.theme['@component-background']};
`

const Inbox = () => {
    return <WrapperInboxStyled>
        <InboxStyled>
            Входящее сообщение
        </InboxStyled>
        <span className="time">12:56</span>
    </WrapperInboxStyled>
};

export default Inbox;