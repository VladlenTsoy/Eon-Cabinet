import {useSelector} from "react-redux"
import {CommonState} from "../../../../../store/common/store"
import {selectAllContacts, getContactsById} from "./contactsSlice"
import {Contact} from "../../interfaces/Contact"

// Загрузка контактов
export const useLoadingContacts = () => useSelector((state: CommonState) => state.contacts.loading)

// Вывод всех контактов
export const useSelectAllContacts = () => useSelector(selectAllContacts)

//
export const useSelectContactsById = (id: Contact["id"] | null) => useSelector((state: CommonState) => id ? getContactsById(state, id) : null)

export const useSelectedContactId = () => useSelector((state: CommonState) => state.contacts.selectedContactId)