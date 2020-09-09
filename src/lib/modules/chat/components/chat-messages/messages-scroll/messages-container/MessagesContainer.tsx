import React from "react"
import MessageComponent from "../message/Message"
import styled from "styled-components"
import {useUser} from "../../../../../../../hooks/use-user"
import {Message} from "../../../../interfaces/Message"

const MessagesContainerStyled = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`

interface MessagesContainerProps {
    messages: Message[]
}

const MessagesContainer:React.FC<MessagesContainerProps> = ({messages}) => {
    const {user} = useUser()

    return (
        <MessagesContainerStyled>
            {messages.map((message) => (
                <MessageComponent
                    message={message}
                    type={user.id === message.user_id ? "outbox" : "inbox"}
                    key={message.id}
                />
            ))}
        </MessagesContainerStyled>
    )
}

export default React.memo(MessagesContainer)
