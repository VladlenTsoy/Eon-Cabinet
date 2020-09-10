import React from "react"
import styled from "styled-components"
import {Message} from "../../../../../interfaces/Message"
import {useUser} from "../../../../../../../../hooks/use-user"

const LastMessageStyled = styled.div`
    color: ${(props) => props.theme.color_second};
    display: flex;

    p {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        width: 100%;
        margin-bottom: 0;

        .me {
            color: ${(props) => props.theme.color_primary};
            margin-right: 0.25rem;
        }
    }

    .notify-count {
        background: ${(props) => props.theme.gradient_primary};
        color: #ffffff;
        border-radius: 50%;
        margin-left: 0.5rem;
        padding: 0 7px;
    }
`

interface LastMessageProps {
    message: Message
    unread: number
}

const LastMessage: React.FC<LastMessageProps> = ({message, unread}) => {
    const {user} = useUser()
    return (
        <LastMessageStyled>
            <p>
                {user.id === message.user_id && <span className="me">Вы:</span>}
                {message.message}
            </p>
            {unread > 0 && <div className="notify-count">{unread}</div>}
        </LastMessageStyled>
    )
}

export default LastMessage
