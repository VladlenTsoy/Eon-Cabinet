import React from "react"
import styled from "styled-components"
import ContactItem from "./contact-item/ContactItem"
import {User} from "../../../../types/common/User"

const ContactListStyled = styled.div`
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
`

interface ContactListProps {
    user: User
    selectContact: (contact: any) => void
}

const ContactList: React.FC<ContactListProps> = ({user, selectContact}) => {
    return (
        <ContactListStyled>
            {Array(15)
                .fill(1)
                .map((_, key) => (
                    <ContactItem contact={{profile: user}} selectContact={selectContact} key={key} />
                ))}
        </ContactListStyled>
    )
}

export default ContactList
