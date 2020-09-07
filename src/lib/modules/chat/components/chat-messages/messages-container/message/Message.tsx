import React from "react"
import styled from "styled-components"
import moment from "moment"
import {Message as MessageType} from "../../../../interfaces/Message"

interface MessageStyledProp extends React.HTMLAttributes<HTMLDivElement> {
    type: "inbox" | "outbox"
}

const WrapperStyled = styled.div<MessageStyledProp>`
    display: flex;
    margin-bottom: 0.5rem;
    height: fit-content;

    justify-content: ${(props) =>
        props.type === "inbox" ? "flex-start" : "flex-end"};
    padding: 0 1rem;

    .time {
        padding: 0.5rem;
        font-size: 12px;
    }
`

const MessageStyled: React.FC<MessageStyledProp> = styled.div<
    MessageStyledProp
>`
    padding: 0.5rem 1rem;
    border-radius: 10px;
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
    white-space: pre;

    background: ${(props) =>
        props.type === "inbox"
            ? props.theme["@component-background"]
            : props.theme.gradient_primary};
    color: ${(props) =>
        props.type === "inbox" ? props.theme.color_main : "#ffffff"};
`

interface MessageProps {
    message: MessageType
    type: "inbox" | "outbox"
}

const Message: React.FC<MessageProps> = ({message, type}) => {
    return (
        <WrapperStyled type={type}>
            <MessageStyled type={type}>{message.message}</MessageStyled>
            <span className="time">
                {moment(message.created_at * 1000).format("DD MMM HH:mm")}
            </span>
        </WrapperStyled>
    )
}

export default Message
