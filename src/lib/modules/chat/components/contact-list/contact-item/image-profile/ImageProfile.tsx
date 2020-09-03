import React from "react"
import {Avatar} from "../../../../../../ui"
import {Contact} from "../../../../interfaces/Contact"

interface ImageProfileProps {
    contact: Contact
}

const ImageProfile: React.FC<ImageProfileProps> = ({contact}) => {
    return <div>
        <Avatar src={contact.image} alt={contact.first_name} width="50px"/>
    </div>
}

export default ImageProfile