import {useSelector} from "react-redux";
import {languageSelector} from "../store/common/language/languageSlice";

export const useLanguage = () => {
    const language = useSelector(languageSelector)
    return {language: language.data}
}