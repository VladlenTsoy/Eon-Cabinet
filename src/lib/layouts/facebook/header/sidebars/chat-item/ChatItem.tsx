import React, {useState} from "react"
import {MessageFilled} from "@ant-design/icons"
import {SidebarButton} from "../sidebar-button/SidebarButton"
import ChatButton from "lib/modules/chat/components/ChatButton"

const ChatItem: React.FC = () => {
    const [visible, setVisible] = useState(false)

    const open = () => setVisible(true)
    const close = () => setVisible(false)

    return <ChatButton close={close} visible={visible}>
        <SidebarButton active={visible} onClick={visible ? close : open}>
            <MessageFilled/>
        </SidebarButton>
    </ChatButton>
}

export default ChatItem