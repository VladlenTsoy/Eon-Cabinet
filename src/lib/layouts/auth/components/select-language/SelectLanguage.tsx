import React from "react"
import {Select} from "antd"
import {useDispatch} from "react-redux"
import {fetchLanguage} from "../../../../../store/common/language/fetchLanguage"
import {
    useSelectAllLanguages,
    useSelectCurrentLanguage
} from "../../../../../store/common/language/languageSelectors"
import {useScreenWindow} from "../../../../../hooks/use-screen-window.effect"

const {Option} = Select

const SelectLanguage: React.FC = () => {
    const currentLanguage = useSelectCurrentLanguage()
    const languages = useSelectAllLanguages()
    const dispatch = useDispatch()
    const [, isBreakpoint] = useScreenWindow({breakpoint: "md"})

    const handlerChange = (abbr: string) => {
        dispatch(fetchLanguage({abbr}))
    }

    return (
        <Select defaultValue={currentLanguage.abbr} onChange={handlerChange}>
            {languages.map((languages) => (
                <Option value={languages.abbr} key={languages.id}>
                    <img
                        src={languages.url_icon}
                        alt={languages.title}
                        width="20px"
                    />
                    {!isBreakpoint && ` ${languages.title}`}
                </Option>
            ))}
        </Select>
    )
}

export default React.memo(SelectLanguage)
