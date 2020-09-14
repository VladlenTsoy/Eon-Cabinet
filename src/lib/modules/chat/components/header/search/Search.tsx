import React from "react"
import {Input} from "antd"
import {CloseOutlined, ArrowLeftOutlined} from "@ant-design/icons"
import {useCommonDispatch} from "../../../../../../store/common/store"
import {fetchContactsBySearch} from "../../../reducer/contacts/fetchContactsBySearch"

interface SearchProps {
    back: () => void
    close: () => void
}

const Search: React.FC<SearchProps> = ({back, close}) => {
    const dispatch = useCommonDispatch()
    let timeout = 0

    const onChangeHandler = (e: any) => {
        const search = e.target.value
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            console.log(search)
            dispatch(fetchContactsBySearch({search}))
        }, [500])
    }

    return <div>
        <div className="back" onClick={back}><ArrowLeftOutlined/></div>
        <div><Input.Search placeholder="Введите Фамилию, Имя или Id" onChange={onChangeHandler}/></div>
        <div className="close" onClick={close}><CloseOutlined/></div>
    </div>
}

export default Search