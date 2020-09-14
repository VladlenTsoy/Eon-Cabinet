import React, {useCallback, useState} from "react"
import ContactList from "./contact-list/ContactList"
import Header from "./header/Header"
import ChatMessages from "./chat-messages/ChatMessages"
import styled from "styled-components"
import More from "./header/more/More"
import List from "./header/list/List"
import Search from "./header/search/Search"
import {useSelectedChatId} from "../reducer/chats/chatsSelectors"
import ContactSearch from "./contact-search/ContactSearch"

const ChatStyled = styled.div`
  display: grid;
  grid-auto-rows: 48px 1fr;
  height: 100%;
`

interface ChatProps {
    close: () => void
}

const Chat: React.FC<ChatProps> = ({close}) => {
    const [isSearch, setIsSearch] = useState(false)
    const selectedChatId = useSelectedChatId()

    const clickSearchHandler = useCallback(() => setIsSearch(true), [])
    const backHandler = useCallback(() => setIsSearch(false), [])

    return <ChatStyled>
        <Header>
            {
                selectedChatId ?
                    <More close={close} chatId={selectedChatId}/> :
                    isSearch ?
                        <Search back={backHandler} close={close}/> :
                        <List close={close} clickSearchHandler={clickSearchHandler}/>


            }
        </Header>
        {
            selectedChatId ?
                <ChatMessages chatId={selectedChatId}/> :
                isSearch ?
                    <ContactSearch/> :
                    <ContactList/>
        }
    </ChatStyled>
}

export default React.memo<ChatProps>(Chat)