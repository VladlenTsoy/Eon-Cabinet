import React from "react"
import {CloseOutlined, ArrowLeftOutlined} from '@ant-design/icons'
import {Contact} from "../../../interfaces/Contact"

interface MoreProps {
    contact: Contact
    back: () => void
    close: () => void
}

const More:React.FC<MoreProps> = ({contact, back, close}) => {
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