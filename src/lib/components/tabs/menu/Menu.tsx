import React from "react"
import style from "./Menu.module.css"
import Item from "./item/Item"

interface MenuProps {
    visible: string | null
    clickHandler: (key: string) => void
}

const Menu: React.FC<MenuProps> = ({children, visible, clickHandler}) => {
    return (
        <div className={style.menu}>
            {React.Children.map(children, (child: any) => (
                <Item
                    key={child.key}
                    active={visible === child.key}
                    clickHandler={() => clickHandler(child.key)}
                >
                    {typeof child.props.title === "function"
                        ? child.props.title(child.key === visible)
                        : child.props.title}
                </Item>
            ))}
        </div>
    )
}

export default Menu
