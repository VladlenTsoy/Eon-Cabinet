import React, {useEffect, useState} from "react"
import styled from "styled-components"
import MessagesContainer from "./messages-container/MessagesContainer"
import InputsContainer from "./inputs-container/InputsContainer"
import {Contact} from "../../interfaces/Contact"
import {firestore} from "../../../../../bin/firebase"
import {LoadingBlock} from "../../../../ui"

const ChatMessageStyled = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

interface ChatMessagesProps {
    contact: Contact
}

const ChatMessages: React.FC<ChatMessagesProps> = ({contact}) => {
    const [messages, setMessages] = useState<any>([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState<number>(1)

    useEffect(() => {
        setLoading(true)
        const unsubscribe = firestore.collection("messages").orderBy("created_at", "desc").limit(page * 25)
            .onSnapshot(async (querySnapshot) => {
                let _messages: any = []
                await querySnapshot.forEach(function(doc) {
                    _messages.push(doc.data())
                })
                setMessages(_messages.reverse())
                setLoading(false)
            })

        return () => {
            unsubscribe()
        }
        // const promise = dispatch(fetchMessages({contact_id: contact.profile.id}))
        // return () => {
        //     promise.abort()
        // }
    }, [contact, page])

    if (loading)
        return <LoadingBlock/>

    return <ChatMessageStyled>
        <MessagesContainer messages={messages} setPage={setPage}/>
        <InputsContainer contactId={contact.profile.id}/>
    </ChatMessageStyled>
}

export default ChatMessages