import React from "react"
import {useLoadingContacts, useSelectAllContacts} from "../../reducer/contacts/contactsSelectors"
import {LoadingBlock} from "../../../../ui"
import {Empty} from "antd"
import {createChat} from "../../reducer/chats/createChat"
import styled from "styled-components"
import {useCommonDispatch} from "../../../../../store/common/store"

const BlockStyled = styled.div`
  padding: 1rem;
  cursor: pointer;
`

const ContactSearch: React.FC = () => {
    const loading = useLoadingContacts()
    const contacts = useSelectAllContacts()
    const dispatch = useCommonDispatch()

    const openChat = (contactId: number) => {
        dispatch(createChat({contactId}))
    }

    return <div>
        {
            loading ?
                <LoadingBlock/> :
                contacts.length ? <>
                    {
                        contacts.map(contact =>
                            <BlockStyled key={contact.id} onClick={() => openChat(contact.id)}>
                                {contact.id}
                                {contact.first_name}
                                {contact.last_name}
                            </BlockStyled>
                        )
                    }

                </> : <Empty/>

        }
    </div>
}

export default ContactSearch