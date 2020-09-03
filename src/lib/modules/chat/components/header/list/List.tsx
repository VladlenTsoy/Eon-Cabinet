import React from "react"
import {CloseOutlined, SearchOutlined} from "@ant-design/icons"

interface ListProps {
    close: () => void
}

const List: React.FC<ListProps> = ({close}) => {
    return <div>
        <div>
            <SearchOutlined/>
        </div>
        <div>Список контактов</div>
        <div className="close" onClick={close}><CloseOutlined/></div>
    </div>
}

export default List