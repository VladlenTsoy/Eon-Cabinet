import {useEffect} from "react"
import socket from "../../../../utils/socket"
import {Message} from "../interfaces/Message"
import {addSocketMessages} from "../reducer/messages/messagesSlice"
import {useDispatch} from "store/store"
import {useSelectCountNotReadAll} from "../reducer/messages/messagesSelectors"
import {fetchMessages} from "../reducer/messages/fetchMessages"
import {User} from "../../../types/common/User"

type HookType = (params: {userId: User['id']}) => number

/**
 * Запрос не прочитанных сообщений
 * @return Кол-во не прочитанных сообщений
 */
export const useChatListeningMessage: HookType = ({userId}) => {
    const dispatch = useDispatch()
    const countNewMessages = useSelectCountNotReadAll(userId)

    useEffect(() => {
        const promise = dispatch(fetchMessages({userId: userId}))
        return () => {
            promise.abort()
        }
    }, [userId, dispatch])

    useEffect(() => {
        // Сообщения отправленные контактом для пользователя
        socket.on(`chat_receive_messages_${userId}`, (messages: Message[]) =>
            dispatch(addSocketMessages(messages))
        )
        return () => {
            socket.removeEventListener(`chat_receive_messages_${userId}`)
        }
    }, [userId, dispatch])

    return countNewMessages
}
