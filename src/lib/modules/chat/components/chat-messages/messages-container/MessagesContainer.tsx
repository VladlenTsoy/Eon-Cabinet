import React, {useEffect} from "react"
import styled from "styled-components"
import Inbox from "./message/inbox/Inbox"
import Outbox from "./message/outbox/Outbox"
import {useUser} from "../../../../../../hooks/use-user"
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
    messages: Message[]
    setPage: any
}

const MessagesContainer: React.FC<MessagesContainerProps> = ({messages, setPage}) => {
    const {user} = useUser()

    useEffect(() => {
        if (messages.length) {
            const scrollBlock = document.getElementById("scroll-chat")
            if (scrollBlock) {
                scrollBlock.scrollTop = scrollBlock.scrollHeight
            }
        }
    }, [messages])

    useEffect(() => {
        const messagesBlock = document.getElementById("scroll-chat")
        if (messagesBlock)
            messagesBlock.addEventListener("scroll", (event: any) => {
                if (event.target.scrollTop === 0)
                    setPage((prevState: any) => ++prevState)
            })
    }, [])

    return (
        <MessagesContainerStyled id="scroll-chat">
            {messages.map((message, key) =>
                user.id === message.user_id ? (
                    <Outbox message={message} key={key}/>
                ) : (
                    <Inbox message={message} key={key}/>
                )
            )}
        </MessagesContainerStyled>
    )
}

export default MessagesContainer
