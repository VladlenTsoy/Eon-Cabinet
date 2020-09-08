import React, {useEffect} from "react"
import styled from "styled-components"
import {useUser} from "../../../../../../hooks/use-user"
import MessageComponent from "./message/Message"
import {Message} from "../../../interfaces/Message"

const MessagesContainerStyled = styled.div`
    padding-top: 0.5rem;
    height: 100%;
    background: ${(props) => props.theme["@layout-body-background"]};
    overflow-x: hidden;
    overflow-y: auto;

    .container {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }
`

interface MessagesContainerProps {
    loading: boolean
    addPage: () => void
    messages: Message[]
}

const MessagesContainer: React.FC<MessagesContainerProps> = ({
    messages,
    addPage,
    loading
}) => {
    const {user} = useUser()

    useEffect(() => {
        if (messages.length) {
            const scrollBlock = document.getElementById("scroll-chat")
            if (scrollBlock) scrollBlock.scrollTop = scrollBlock.scrollHeight
        }
    }, [messages])

    useEffect(() => {
        const messagesBlock = document.getElementById("scroll-chat")
        if (messagesBlock)
            messagesBlock.addEventListener("scroll", (event: any) => {
                if (event.target.scrollTop === 0) addPage()
            })
    }, [addPage])

    return (
        <div style={{height: "100%", overflow: "hidden"}}>
            {loading && <div>Загрузка...</div>}
            <MessagesContainerStyled id="scroll-chat">
                <div className="container">
                    {messages.map((message) => (
                        <MessageComponent
                            message={message}
                            type={
                                user.id === message.user_id ? "outbox" : "inbox"
                            }
                            key={message.id}
                        />
                    ))}
                </div>
            </MessagesContainerStyled>
        </div>
    )
}

export default MessagesContainer
