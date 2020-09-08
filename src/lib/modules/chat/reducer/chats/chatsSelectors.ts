import {useSelector} from "react-redux"
import {CommonState} from "../../../../../store/common/store"
import {selectAllChats, getChatsById} from "./chatsSlice"
import {Chat} from "../../interfaces/Chat"

// Загрузка контактов
export const useLoadingChats = () => useSelector((state: CommonState) => state.chats.loading)

// Вывод всех контактов
export const useSelectAllChats = () => useSelector(selectAllChats)

//
export const useSelectChatsById = (id: Chat["chat_id"] | null) => useSelector((state: CommonState) => id ? getChatsById(state, id) : null)

export const useSelectedChatId = () => useSelector((state: CommonState) => state.chats.selectedChatId)