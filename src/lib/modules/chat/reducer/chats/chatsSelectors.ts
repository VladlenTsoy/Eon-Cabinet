import {useSelector} from "react-redux"
import {CommonState} from "store/store"
import {selectAllChats, getChatsById} from "./chatsSlice"
import {Chat} from "../../interfaces/Chat"

/**
 * Загрузка чатов
 * @return Boolean
 */
export const useLoadingChats = () => useSelector((state: CommonState) => state.chats.loading)

/**
 * Вывод всех контактов
 * @return Chat[]
 */
export const useSelectAllChats = () => useSelector(selectAllChats)

/**
 * Вывод чата по ID
 * @param id
 */
export const useSelectChatsById = (id: Chat["chat_id"]) =>
    useSelector((state: CommonState) => getChatsById(state, id))

/**
 * Ввывод ID активного чата
 * @return Number
 */
export const useSelectedChatId = () => useSelector((state: CommonState) => state.chats.selectedChatId)
