import React from "react"
import {CloseOutlined, ArrowLeftOutlined} from "@ant-design/icons"
import {Contact} from "../../../interfaces/Contact"
import {useCommonDispatch} from "../../../../../../store/common/store"
import {changeSelectedContactId} from "../../../reducer/contacts/contactsSlice"
import {useSelectContactsById} from "../../../reducer/contacts/contactsSelectors"

interface MoreProps {
    contactId: Contact["id"]
    close: () => void
}

const More: React.FC<MoreProps> = ({close, contactId}) => {
    const dispatch = useCommonDispatch()
    const back = () => dispatch(changeSelectedContactId(null))
    const contact = useSelectContactsById(contactId)

    if (!contact)
        return <div>Загрузка...</div>

    return (
        <div>
            <div className="back" onClick={back}><ArrowLeftOutlined/></div>
            <div>
                {contact.last_name} {contact.first_name}
            </div>
            <div className="close" onClick={close}><CloseOutlined/></div>
        </div>
    )
}

export default More