import React from 'react';
import styled from "styled-components";
import {MessageStyled, WrapperMessageStyled} from "../Message";

const WrapperOutboxStyled = styled(WrapperMessageStyled)`
  justify-content: flex-end;
  padding-right: 0.5rem;
`

const OutboxStyled = styled(MessageStyled)`
  color: #ffffff;
  background: ${props => props.theme.gradient_primary};
`

const Outbox = () => {
    return <WrapperOutboxStyled>
        <span className="time">12:56</span>
        <OutboxStyled>
            Исходящие сообщения
        </OutboxStyled>
    </WrapperOutboxStyled>
};

export default Outbox;