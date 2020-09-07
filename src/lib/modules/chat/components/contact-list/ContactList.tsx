import React, {useEffect} from "react"
import styled from "styled-components"
import ContactItem from "./contact-item/ContactItem"
import {fetchContacts} from "../../reducer/contacts/fetchContacts"
import {useCommonDispatch} from "../../../../../store/common/store"
import {
    useSelectAllContacts,
    useLoadingContacts
} from "../../reducer/contacts/contactsSelectors"
import {LoadingBlock} from "../../../../ui"

const ContactListStyled = styled.div`
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
`

const ContactList: React.FC = () => {
    const dispatch = useCommonDispatch()
    const loading = useLoadingContacts()
    const contacts = useSelectAllContacts()

    useEffect(() => {
        const promise = dispatch(fetchContacts())
        return () => {
            promise.abort()
        }
    }, [dispatch])

    if (loading) return <LoadingBlock/>

    return (
        <ContactListStyled>
            {contacts.map((contact, key) => (
                <ContactItem contact={contact} key={key}/>
            ))}
        </ContactListStyled>
    )
}

export default ContactList
