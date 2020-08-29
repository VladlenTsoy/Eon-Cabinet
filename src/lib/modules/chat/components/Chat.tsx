import React, {useCallback, useState} from 'react';
import ContactList from "./contact-list/ContactList";
import Header from "./header/Header";
import ChatMessages from "./chat-messages/ChatMessages";
import styled from "styled-components";
import {User} from "../../../types/common/User"

const ChatStyled = styled.div`
  display: grid;
  grid-auto-rows: 41px 1fr;
  height: 100%;
`

interface ChatProps {
    user: User
    close: () => void
}

const Chat:React.FC<ChatProps> = ({close, user}) => {
    const [contact, setContact] = useState(null)

    const selectContact = useCallback((contact: any) => {
        setContact(contact)
    }, [])

    const resetContact = useCallback(() => {
        setContact(null)
    }, [])

    return <ChatStyled>
        <Header contact={contact} back={resetContact} close={close}/>
        {
            contact ?
                <ChatMessages contact={contact}/> :
                <ContactList user={user} selectContact={selectContact}/>
        }
    </ChatStyled>
};

export default Chat;