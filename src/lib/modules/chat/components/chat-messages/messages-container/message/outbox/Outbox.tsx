import React from "react"
import styled from "styled-components"
import {MessageStyled, WrapperMessageStyled} from "../Message"
import {Message} from "../../../../../interfaces/Message"
import moment from "moment"

const WrapperOutboxStyled = styled(WrapperMessageStyled)`
  justify-content: flex-end;
  padding-right: 1rem;
`

const OutboxStyled = styled(MessageStyled)`
  color: #ffffff;
  background: ${props => props.theme.gradient_primary};
`

interface OutboxProps {
    message: Message
}

const Outbox: React.FC<OutboxProps> = ({message}) => {
    return <WrapperOutboxStyled>
        <span className="time">{moment(message.created_at.seconds * 1000).format('DD MMM HH:mm')}</span>
        <OutboxStyled>
            {message.message}
        </OutboxStyled>
    </WrapperOutboxStyled>
}

export default Outbox