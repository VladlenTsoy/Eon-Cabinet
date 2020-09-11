import React from "react"
import ContactList from "./contact-list/ContactList"
import Header from "./header/Header"
import ChatMessages from "./chat-messages/ChatMessages"
import styled from "styled-components"
import More from "./header/more/More"
import List from "./header/list/List"
import {useSelectedChatId} from "../reducer/chats/chatsSelectors"

const ChatStyled = styled.div`
  display: grid;
  grid-auto-rows: 41px 1fr;
  height: 100%;
`

interface ChatProps {
    close: () => void
}

const Chat: React.FC<ChatProps> = ({close}) => {
    const selectedChatId = useSelectedChatId()

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

export default React.memo<ChatProps>(Chat)