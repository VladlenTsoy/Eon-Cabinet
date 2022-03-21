import React from "react"
import {Select} from "antd"
import {useScreenWindow} from "../../../../../hooks/use-screen-window.effect"

const {Option} = Select

const SelectLanguage: React.FC = () => {
    const [, isBreakpoint] = useScreenWindow({breakpoint: "md"})

    const handlerChange = (abbr: string) => {
        return null
    }

    return (
        <>
            <Select defaultValue="ru" onChange={handlerChange} showSearch>
                <Option value="ru">
                    <img
                        src="/images/flags/ru.svg"
                        alt="Русский"
                        width="20px"
                    />
                    {!isBreakpoint && ` Русский`}
                </Option>
                <Option value="uz">
                    <img
                        src="/images/flags/uz.svg"
                        alt="O'zbek"
                        width="20px"
                    />
                    {!isBreakpoint && ` O'zbek`}
                </Option>
            </Select>
        </>
    )
}

export default React.memo(SelectLanguage)
