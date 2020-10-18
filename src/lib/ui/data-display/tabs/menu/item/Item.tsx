import React from "react"
import style from "./Item.module.css"

interface ItemProps {
    active: boolean
    clickHandler: () => void
}

const Item: React.FC<ItemProps> = ({active, children, clickHandler}) => {
    return (
        <div className={`${style.item} ${active ? style.active : ""}`} onClick={clickHandler}>
            {children}
        </div>
    )
}

export default Item
