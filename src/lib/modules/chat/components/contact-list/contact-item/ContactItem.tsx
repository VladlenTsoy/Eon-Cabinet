import React from "react"
import styled from "styled-components"
import ImageProfile from "./image-profile/ImageProfile"
import {Contact} from "../../../interfaces/Contact"
// import LastMessage from "./content/last-message/LastMessage"
import InfoProfile from "./content/info-profile/InfoProfile"

const ContactItemStyled = styled.div`
    display: grid;
    gap: 1rem;
    grid-template-columns: 50px 1fr;
    overflow: hidden;
    padding: 0.5rem 1rem;
    align-items: center;
    cursor: pointer;

    :hover {
        background: ${(props) => props.theme.color_hover_item};
    }

    .content {
      overflow: hidden;
    }
`

interface ContactItemProps {
    contact: Contact
    selectContact: (ContactItemProps: any) => void
}

const ContactItem: React.FC<ContactItemProps> = ({contact, selectContact}) => {
    const onClickHandler = () => selectContact(contact)

    return (
        <ContactItemStyled onClick={onClickHandler}>
            <ImageProfile contact={contact}/>
            <div className="content">
                <InfoProfile contact={contact}/>
                {/*<LastMessage message={contact.messages?.last.message || ""} unread={contact.messages?.not_read || 0}/>*/}
            </div>
        </ContactItemStyled>
    )
}

export default ContactItem
