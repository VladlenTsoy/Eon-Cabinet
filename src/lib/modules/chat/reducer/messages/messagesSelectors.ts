// Загрузка домашних заданий по категории
import {useSelector} from "react-redux"
import {CommonState} from "../../../../../store/common/store"
import {Chat} from "../../interfaces/Chat"
import {selectAllMessages} from "./messagesSlice"

export const useLoadingMessagesByChatId = (chatId: Chat['chat_id']): boolean => useSelector((state: CommonState) => state.messages.chats[chatId]?.loading || false)

// Последняя страница
export const useLastPageMessagesByChatId = (chatId: Chat['chat_id']): number => useSelector((state: CommonState) => state.messages.chats[chatId]?.last_page || 0)

// Текущая страница
export const useCurrentPageMessagesByChatId = (chatId: Chat['chat_id']): number => useSelector((state: CommonState) => state.messages.chats[chatId]?.current_page || 1)

// Вывод всех групп
export const useSelectAllMessages = () => useSelector(selectAllMessages)

// Вывод всех групп по категории
export const useSelectMessagesByChatId = (chatId: Chat['chat_id']) => {
    const messages = useSelectAllMessages()
    return messages.filter(message => message.chat_id === chatId)
}