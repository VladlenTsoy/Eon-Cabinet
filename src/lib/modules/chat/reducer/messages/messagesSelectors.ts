// Загрузка домашних заданий по категории
import {useSelector} from "react-redux"
import {CommonState} from "../../../../../store/common/store"
import {Chat} from "../../interfaces/Chat"
import {selectAllMessages} from "./messagesSlice"
import {User} from "../../../../types/common/User"

/**
 * Вывод загрузкии сообщений в чате
 * @param chatId
 */
export const useLoadingMessagesByChatId = (chatId: Chat["chat_id"]): boolean =>
    useSelector((state: CommonState) => state.messages.chats[chatId]?.loading || false)

/**
 * Вывод последней страницы сообщений в чате
 * @param chatId
 */
export const useLastPageMessagesByChatId = (chatId: Chat["chat_id"]): number =>
    useSelector((state: CommonState) => state.messages.chats[chatId]?.last_page || 0)

/**
 * Номер текущей страницы сообщений в чате
 * @param chatId
 */
export const useCurrentPageMessagesByChatId = (chatId: Chat["chat_id"]): number =>
    useSelector((state: CommonState) => state.messages.chats[chatId]?.current_page || 1)

/**
 * Вывод всех сообщений
 */
export const useSelectAllMessages = () => useSelector(selectAllMessages)

/**
 * Вывод сообщений в чате
 * @param chatId
 */
export const useSelectMessagesByChatId = (chatId: Chat["chat_id"]) => {
    const messages = useSelectAllMessages()
    return messages.filter(message => message.chat_id === chatId)
}

/**
 * Вывод последнего сообщения в чате
 * @param chatId
 */
export const useLastMessageByChatId = (chatId: Chat["chat_id"]) => {
    const all = useSelectAllMessages()
    const messages = all.filter(message => message.chat_id === chatId)
    return messages.length ? messages[messages.length - 1] : null
}

/**
 * Кол-во не прочитанных в определенном чате
 * @param chatId
 * @param userId
 */
export const useSelectCountNotReadByChatId = (chatId: Chat["chat_id"], userId: User["id"]) => {
    const messages = useSelectAllMessages()
    return messages.filter(
        message => message.chat_id === chatId && message.status === "new" && message.user_id !== userId
    ).length
}

/**
 * Вывод общее кол-во не прочитанных сообщений пользователя
 * @param userId
 * @return number
 */
export const useSelectCountNotReadAll = (userId: User["id"]) => {
    const messages = useSelectAllMessages()
    return messages.filter(
        message => message.status === "new" && message.user_id !== userId
    ).length
}