import React from "react"
import {useLoadingContacts, useSelectAllContacts} from "../../../../reducer/contacts/contactsSelectors"
import {LoadingBlock} from "../../../../../../ui"
import {Empty} from "antd"
import ContactItem from "./contact-item/ContactItem"

interface ContainerProps {

}

const Container: React.FC<ContainerProps> = () => {
    const loading = useLoadingContacts()
    const contacts = useSelectAllContacts()

    if (loading)
        return <LoadingBlock/>

    if (!contacts.length)
        return <Empty/>

    return <>
        {contacts.map(contact => <ContactItem key={contact.id} contact={contact}/>)}
    </>
}

export default Container