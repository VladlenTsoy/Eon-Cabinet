import React, {useEffect} from "react"
import ContactList from "./contact-list/ContactList"
import Header from "./header/Header"
import ChatMessages from "./chat-messages/ChatMessages"
import styled from "styled-components"
import {useSelectedContactId} from "../reducer/contacts/contactsSelectors"
import More from "./header/more/More"
import List from "./header/list/List"
import socket from "../../../../utils/socket"

const ChatStyled = styled.div`
  display: grid;
  grid-auto-rows: 41px 1fr;
  height: 100%;
`

interface ChatProps {
    close: () => void
}

const Chat: React.FC<ChatProps> = ({close}) => {
    const selectedContactId = useSelectedContactId()

    useEffect(() => {
        socket.on("check_chat", () => {
            // console.log(1)
        })

        socket.emit("chat message", "world")
    }, [])

    return <ChatStyled>
        <Header>
            {
                selectedContactId ?
                    <More close={close} contactId={selectedContactId}/> :
                    <List close={close}/>
            }
        </Header>
        {
            selectedContactId ?
                <ChatMessages selectedContactId={selectedContactId}/> :
                <ContactList/>
        }
    </ChatStyled>
}

export default Chat