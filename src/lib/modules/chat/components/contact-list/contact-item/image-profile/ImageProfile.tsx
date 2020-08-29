import React from "react"
import {Avatar} from "../../../../../../ui"
import {Contact} from "../../../../interfaces/Contact"

interface ImageProfileProps {
    profile: Contact["profile"]
}

const ImageProfile: React.FC<ImageProfileProps> = ({profile}) => {
    return <div>
        <Avatar src={profile.image} alt={profile.first_name} width="50px"/>
    </div>
}

export default ImageProfile