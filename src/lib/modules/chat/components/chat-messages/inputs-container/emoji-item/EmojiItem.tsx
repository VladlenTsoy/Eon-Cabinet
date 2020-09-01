import React, {useEffect} from "react"
import {SmileOutlined} from "@ant-design/icons"

interface EmojiItemProps {
    active: boolean
    setEmojiVisible: any
}

const EmojiItem: React.FC<EmojiItemProps> = ({setEmojiVisible, active}) => {
    const mouseEnterHandler = () => {
        setEmojiVisible(true)
    }

    const mouseLeaveHandler = () => {
        setEmojiVisible(false)
    }

    return <div onMouseLeave={mouseLeaveHandler} onMouseEnter={mouseEnterHandler}>
        <SmileOutlined/>
    </div>
}

export default EmojiItem