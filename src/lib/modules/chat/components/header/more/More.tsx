import React from "react"
import {CloseOutlined, ArrowLeftOutlined} from "@ant-design/icons"
import {Chat} from "../../../interfaces/Chat"
import {useCommonDispatch} from "../../../../../../store/common/store"
import {changeSelectedChatId} from "../../../reducer/chats/chatsSlice"
import {useSelectChatsById} from "../../../reducer/chats/chatsSelectors"
import Profile from "./profile/Profile"

interface MoreProps {
    chatId: Chat["chat_id"]
    close: () => void
}

const More: React.FC<MoreProps> = ({close, chatId}) => {
    const dispatch = useCommonDispatch()
    const back = () => dispatch(changeSelectedChatId(null))
    const chat = useSelectChatsById(chatId)

    return (
        <div>
            <div className="back" onClick={back}><ArrowLeftOutlined/></div>
            {chat ? <Profile contact={chat.contact}/> : "Загрузка..."}
            <div className="close" onClick={close}><CloseOutlined/></div>
        </div>
    )
}

export default More