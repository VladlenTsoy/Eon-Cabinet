import React from "react"
import {Input} from "antd"
import {CloseOutlined, ArrowLeftOutlined} from "@ant-design/icons"
import {useDispatch} from "store/store"
import {fetchContactsBySearch} from "../../../reducer/contacts/fetchContactsBySearch"

interface SearchProps {
    back: () => void
    close: () => void
}

const Search: React.FC<SearchProps> = ({back, close}) => {
    const dispatch = useDispatch()

    const onChangeHandler = (search: string) => {
        if (search.trim() !== "")
            dispatch(fetchContactsBySearch({search}))
    }

    return <div>
        <div className="back" onClick={back}><ArrowLeftOutlined/></div>
        <div>
            <Input.Search
                placeholder="Введите Фамилию, Имя или Id"
                onSearch={onChangeHandler}
                minLength={1}
            />
        </div>
        <div className="close" onClick={close}><CloseOutlined/></div>
    </div>
}

export default Search
