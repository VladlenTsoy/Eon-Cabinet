import React, {useEffect} from "react"
import ContactList from "./contact-list/ContactList"
import Header from "./header/Header"
import ChatMessages from "./chat-messages/ChatMessages"
import styled from "styled-components"
import {useSelectedChatId} from "../reducer/chats/chatsSelectors"
import More from "./header/more/More"
import List from "./header/list/List"
import socket from "../../../../utils/socket"
import {useUser} from "../../../../hooks/use-user"

const ChatStyled = styled.div`
  display: grid;
  grid-auto-rows: 41px 1fr;
  height: 100%;
`

interface ChatProps {
    close: () => void
}

const Chat: React.FC<ChatProps> = ({close}) => {
    const {user} = useUser()
    const selectedChatId = useSelectedChatId()

    useEffect(() => {
        socket.on(`receive_messages${user.id}`, () => {
            alert(1)
        })
        return () => {
            socket.removeEventListener(`receive_messages${user.id}`);
        }
    }, [user])

    return <ChatStyled>
        <Header>
            {
                selectedChatId ?
                    <More close={close} chatId={selectedChatId}/> :
                    <List close={close}/>
            }
        </Header>
        {
            selectedChatId ?
                <ChatMessages chatId={selectedChatId}/> :
                <ContactList/>
        }
    </ChatStyled>
}

export default Chat