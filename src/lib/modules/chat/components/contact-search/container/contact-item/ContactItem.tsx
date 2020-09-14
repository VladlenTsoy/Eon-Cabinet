import React from "react"
import {Contact} from "../../../../interfaces/Contact"
import {useCommonDispatch} from "../../../../../../../store/common/store"
import {createChat} from "../../../../reducer/chats/createChat"
import ImageProfile from "../../../contact-list/contact-item/image-profile/ImageProfile"
import InfoProfile from "../../../contact-list/contact-item/content/info-profile/InfoProfile"
import {ContactItemStyled} from "../../../contact-list/contact-item/ContactItem"

interface ContactItemProps {
    contact: Contact
}

const ContactItem: React.FC<ContactItemProps> = ({contact}) => {
    const dispatch = useCommonDispatch()

    const openChat = (contactId: number) => {
        dispatch(createChat({contactId}))
    }

    return (
        <ContactItemStyled onClick={() => openChat(contact.id)}>
            <ImageProfile contact={contact}/>
            <div className="content">
                <InfoProfile chat={{contact: contact, chat_id: 0}}/>
            </div>
        </ContactItemStyled>
    )
}

export default ContactItem