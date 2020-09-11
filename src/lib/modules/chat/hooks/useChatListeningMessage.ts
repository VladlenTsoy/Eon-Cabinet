import {useEffect} from "react"
import socket from "../../../../utils/socket"
import {Message} from "../interfaces/Message"
import {addSocketMessages} from "../reducer/messages/messagesSlice"
import {useCommonDispatch} from "../../../../store/common/store"
import {useSelectedChatId} from "../reducer/chats/chatsSelectors"
import {useUser} from "../../../../hooks/use-user"
import {useSelectCountNotReadAll} from "../reducer/messages/messagesSelectors"

type HookType = () => number

export const useChatListeningMessage: HookType = () => {
    const {user} = useUser()
    const dispatch = useCommonDispatch()
    const selectedChatId = useSelectedChatId()
    const countNewMessages = useSelectCountNotReadAll(user.id)

    useEffect(() => {
        socket.emit(`chat_check_receive_messages`, {userId: user.id})
        socket.on(`chat_receive_messages_${user.id}`, (messages: Message[]) => {
            messages = messages.map(message => ({
                ...message,
                status: selectedChatId === message.chat_id ? "view" : message.status
            }))
            dispatch(addSocketMessages(messages))
        })
        return () => {
            socket.removeEventListener(`chat_receive_messages_${user.id}`)
        }
    }, [user, dispatch, selectedChatId])

    return countNewMessages
}