import React, {useCallback, useState} from 'react';
import ContactList from "./contact-list/ContactList";
import Header from "./header/Header";
import ChatMessages from "./chat-messages/ChatMessages";
import styled from "styled-components";

const ChatStyled = styled.div`
  display: grid;
  grid-auto-rows: 41px 1fr;
  height: 100%;
`

interface ChatProps {
    close: () => void
}

const Chat:React.FC<ChatProps> = ({close}) => {
    const [contact, setContact] = useState(null)

    const selectUser = useCallback((user: any) => {
        setContact(user)
    }, [])

    const resetContact = useCallback(() => {
        setContact(null)
    }, [])

    return <ChatStyled>
        <Header contact={contact} back={resetContact} close={close}/>
        {
            contact ?
                <ChatMessages contact={contact}/> :
                <ContactList selectUser={selectUser}/>
        }
    </ChatStyled>
};

export default Chat;