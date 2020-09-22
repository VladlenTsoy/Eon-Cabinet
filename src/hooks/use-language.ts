import {useSelectCurrentLanguage} from "../store/common/language/languageSelectors"

export const useLanguage = () => {
    const currentLanguage = useSelectCurrentLanguage();

    const lang = (key: string): any => {
        return currentLanguage.data[key];
    }

    return {lang, l: lang}
}