import React from "react"
import {CloseOutlined, SearchOutlined} from "@ant-design/icons"

interface ListProps {
    close: () => void
    clickSearchHandler: () => void
}

const List: React.FC<ListProps> = ({close, clickSearchHandler}) => {
    return <div>
        <div className="search" onClick={clickSearchHandler}>
            <SearchOutlined/>
        </div>
        <div>Список контактов</div>
        <div className="close" onClick={close}>
            <CloseOutlined/>
        </div>
    </div>
}

export default List