import {useSelector} from "react-redux"
import {CommonState} from "store/store"
import {selectAllContacts, getContactById} from "./contactsSlice"
import {Contact} from "../../interfaces/Contact"

/**
 * Вывод загрузки контактов
 * @return Boolean
 */
export const useLoadingContacts = () => useSelector((state: CommonState) => state.contacts.loading)

/**
 * Вывод всех контактов
 * @return Contact[]
 */
export const useSelectAllContacts = () => useSelector(selectAllContacts)

/**
 * Вывод контакта по ID
 * @param id
 */
export const useSelectContactById = (id: Contact["id"]) =>
    useSelector((state: CommonState) => getContactById(state, id))
