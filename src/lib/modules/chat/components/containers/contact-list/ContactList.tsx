import React, {useEffect} from "react"
import styled from "styled-components"
import ContactItem from "./contact-item/ContactItem"
import {fetchChats} from "../../../reducer/chats/fetchChats"
import {useCommonDispatch} from "../../../../../../store/common/store"
import {
    useSelectAllChats,
    useLoadingChats
} from "../../../reducer/chats/chatsSelectors"
import {LoadingBlock} from "../../../../../ui"

const ContactListStyled = styled.div`
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
`

const ContactList: React.FC = () => {
    const dispatch = useCommonDispatch()
    const loading = useLoadingChats()
    const chats = useSelectAllChats()

    useEffect(() => {
        const promise = dispatch(fetchChats())
        return () => {
            promise.abort()
        }
    }, [dispatch])

    if (loading) return <LoadingBlock/>

    return (
        <ContactListStyled>
            {chats.map((chat) => (
                <ContactItem chat={chat} key={chat.chat_id}/>
            ))}
        </ContactListStyled>
    )
}

export default ContactList
