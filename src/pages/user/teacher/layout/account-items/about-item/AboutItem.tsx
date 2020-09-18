import React from "react"
import {InfoOutlined} from "@ant-design/icons"
import {useHistory} from "react-router-dom"

const AboutItem = () => {
    const history = useHistory()

    const toPlatform = () => history.push("/platform")

    return (
        <div onClick={toPlatform}>
            <InfoOutlined /> О платформе
        </div>
    )
}

export default AboutItem
