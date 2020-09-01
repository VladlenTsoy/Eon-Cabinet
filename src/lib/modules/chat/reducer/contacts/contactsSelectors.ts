import {useSelector} from "react-redux"
import {CommonState} from "../../../../../store/common/store"
import {selectAllContacts} from "./contactsSlice"

// Загрузка контактов
export const useLoadingContacts = () => useSelector((state: CommonState) => state.contacts.loading)

// Вывод всех контактов
export const useSelectAllContacts = () => useSelector(selectAllContacts)