import React, {useEffect} from "react"
import styled from "styled-components"
import {useUser} from "../../../../../../hooks/use-user"
import MessageComponent from "./message/Message"
import {Message} from "../../../interfaces/Message"

const MessagesContainerStyled = styled.div`
    padding-top: 0.5rem;
    height: 100%;
    background: ${(props) => props.theme["@layout-body-background"]};
    display: grid;
    flex-direction: column;
    justify-content: flex-end;
    overflow-x: hidden;
    overflow-y: auto;
`

interface MessagesContainerProps {
    loading: boolean
    addPage: () => void
    messages: Message[]
}

const MessagesContainer: React.FC<MessagesContainerProps> = ({messages, addPage, loading}) => {
    const {user} = useUser()

    useEffect(() => {
        if (messages.length) {
            const scrollBlock = document.getElementById("scroll-chat")
            if (scrollBlock)
                scrollBlock.scrollTop = scrollBlock.scrollHeight
        }
    }, [messages])

    useEffect(() => {
        const messagesBlock = document.getElementById("scroll-chat")
        if (messagesBlock)
            messagesBlock.addEventListener("scroll", (event: any) => {
                if (event.target.scrollTop === 0)
                    addPage()
            })
    }, [addPage])

    return (
        <MessagesContainerStyled id="scroll-chat">
            {loading && <div>Загрузка...</div>}
            {messages.map((message, key) => (
                <MessageComponent
                    message={message}
                    type={user.id === message.user_id ? "outbox" : "inbox"}
                    key={key}
                />
            ))}
        </MessagesContainerStyled>
    )
}

export default MessagesContainer
