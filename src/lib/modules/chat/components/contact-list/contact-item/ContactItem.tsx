import React from "react"
import styled from "styled-components"
import ImageProfile from "./image-profile/ImageProfile"
import {Contact} from "../../../interfaces/Contact"
import LastMessage from "./content/last-message/LastMessage"
import InfoProfile from "./content/info-profile/InfoProfile"
import {changeSelectedContactId} from "../../../reducer/contacts/contactsSlice"
import {useCommonDispatch} from "../../../../../../store/common/store"

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
}

const ContactItem: React.FC<ContactItemProps> = ({contact}) => {
    const dispatch = useCommonDispatch()
    const onClickHandler = () => dispatch(changeSelectedContactId(contact.id))

    return (
        <ContactItemStyled onClick={onClickHandler}>
            <ImageProfile contact={contact}/>
            <div className="content">
                <InfoProfile contact={contact}/>
                <LastMessage message={contact.messages?.last.message || ""} unread={contact.messages?.not_read || 0}/>
            </div>
        </ContactItemStyled>
    )
}

export default ContactItem
