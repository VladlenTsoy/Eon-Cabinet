import React from "react"
import styled from "styled-components"
import Contactitem from "./contact-item/ContactItem"

const ContactListStyled = styled.div`
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
`

interface ContactListProps {
    selectContact: (contact: any) => void
}

const ContactList: React.FC<ContactListProps> = ({selectContact}) => {
    return (
        <ContactListStyled>
            {Array(15)
                .fill(1)
                .map((_, key) => (
                    <Contactitem selectContact={selectContact} key={key} />
                ))}
        </ContactListStyled>
    )
}

export default ContactList
