import React, {useEffect, useState} from "react"
import styled from "styled-components"
import Inbox from "./message/inbox/Inbox"
import Outbox from "./message/outbox/Outbox"
import {useUser} from "../../../../../../hooks/use-user"
import {Message} from "../../../interfaces/Message"
import {firestore} from "../../../../../../bin/firebase"
import {LoadingBlock} from "../../../../../ui"
import {Contact} from "../../../interfaces/Contact"

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
    contact: Contact
}

const MessagesContainer: React.FC<MessagesContainerProps> = ({contact}) => {
    const {user} = useUser()
    const [loading, setLoading] = useState(false)
    const [messages, setMessages] = useState<Message[]>([])
    const [page, setPage] = useState<number>(1)

    useEffect(() => {
        setLoading(true)
        const unsubscribe = firestore
            .collection("messages")
            .where("user_id", "==", user.id)
            .where("contact_id", "==", contact.id)
            .orderBy("created_at", "desc")
            .limit(page * 25)
            .onSnapshot(
                (querySnapshot) => {
                    console.log(querySnapshot.docChanges())
                    setMessages(
                        querySnapshot.docs.map((doc):Message => ({
                            id: doc.id, ...doc.data(),
                            created_at: doc.data().created_at.seconds
                        }) as Message).reverse()
                    )
                    setLoading(false)
                }
            )
        return () => {
            unsubscribe()
        }
    }, [contact, page, user])

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


    if (loading)
        return <LoadingBlock/>

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
