import {useSelector} from "react-redux"
import {CommonState} from "../../../../../store/common/store"
import {selectAllMessages} from "./messagesSlice"

// Загрузка сообщений
export const useLoadingMessages = () => useSelector((state: CommonState) => state.messages.loading)

// Вывод всех сообщений
export const useSelectAllMessages = () => useSelector(selectAllMessages)