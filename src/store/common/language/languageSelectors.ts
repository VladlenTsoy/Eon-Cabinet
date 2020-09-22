import {useSelector} from "react-redux"
import {CommonState} from "../store"
import {selectAllLanguages, getLanguageById} from "./languageSlice"
import {Language} from "../../../lib/types/common/Language"

// Загрузка языка
export const useLoadingLanguage = () => useSelector((state: CommonState) => state.language.loading)

// Вывод всех языков
export const useSelectAllLanguages = () => useSelector(selectAllLanguages)

// Вывод языка по ID
export const useSelectLanguageById = (id: Language['id']) => useSelector((state: CommonState) => getLanguageById(state, id))


// Вывод языка по ID
export const useSelectCurrentLanguage = () => useSelector((state: CommonState) => state.language)
