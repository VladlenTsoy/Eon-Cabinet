import React, {useState} from "react"
import {Button} from "antd"
import {MessageFilled} from "@ant-design/icons"
import ChatButton from "../../../../../modules/chat/components/ChatButton"

const ChatItem: React.FC = () => {
    const [visible, setVisible] = useState(false)

    const open = () => setVisible(true)
    const close = () => setVisible(false)

    return <ChatButton close={close} visible={visible}>
        <Button
            type={visible ? "primary" : "default"}
            shape="circle"
            onClick={visible ? close : open}
            icon={<MessageFilled/>}
        />
    </ChatButton>
}

export default React.memo(ChatItem)
