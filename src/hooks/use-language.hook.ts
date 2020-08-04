import {useSelector} from "react-redux";
import {languageSelector} from "../store/common/language/languageSlice";

export const useLanguage = () => {
    const language = useSelector(languageSelector);

    const lang = (key: string): any => {
        return language.data[key];
    }

    return {lang, l: lang}
}