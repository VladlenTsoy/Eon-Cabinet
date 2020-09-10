import {useEffect} from "react"
import socket from "../../../../utils/socket"
import {Message} from "../interfaces/Message"
import {addSocketMessage} from "../reducer/messages/messagesSlice"
import {updateContactLastMessage} from "../reducer/chats/chatsSlice"
import {useCommonDispatch} from "../../../../store/common/store"
import {useSelectedChatId} from "../reducer/chats/chatsSelectors"
import {useUser} from "../../../../hooks/use-user"
import {useSelectCountNotReadAll} from "../reducer/messages/messagesSelectors"

export const useListeningNewMessages = () => {
    const {user} = useUser()
    const dispatch = useCommonDispatch()
    const selectedChatId = useSelectedChatId()
    const countNewMessages = useSelectCountNotReadAll(user.id)

    useEffect(() => {
        socket.on(`chat_receive_messages_${user.id}`, (_message: Message) => {
            let message = _message
            if (selectedChatId === message.chat_id)
                message = {..._message, status: "view"}

            dispatch(addSocketMessage(message))
            dispatch(updateContactLastMessage(message))
        })
        return () => {
            socket.removeEventListener(`receive_messages_${user.id}`)
        }
    }, [user, dispatch, selectedChatId])

    return [countNewMessages]
}