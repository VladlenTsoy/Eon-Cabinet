import React from 'react';
import styled from "styled-components";
import {MessageStyled, WrapperMessageStyled} from "../Message";
import moment from "moment"

const WrapperInboxStyled = styled(WrapperMessageStyled)`
  justify-content: flex-start;
  padding-left: 1rem;
`

const InboxStyled = styled(MessageStyled)`
  background: ${props => props.theme['@component-background']};
`

interface InboxProps {
    message: any
}

const Inbox:React.FC<InboxProps> = ({message}) => {
    return <WrapperInboxStyled>
        <InboxStyled>
            {message.message}
        </InboxStyled>
        <span className="time">{moment(message.created_at.seconds * 1000).format('DD MMM HH:mm')}</span>
    </WrapperInboxStyled>
};

export default Inbox;