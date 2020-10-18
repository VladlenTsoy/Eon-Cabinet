import React, {useState} from "react"
import style from "./Tabs.module.css"
import Menu from "./menu/Menu"
import Container from "./container/Container"

interface TabsProps {
    topExtra?: React.ReactFragment
    defaultValue?: string | null
    onChange?: (key: string) => void
}

const Tabs: React.FC<TabsProps> = ({topExtra, defaultValue = null, children, onChange}) => {
    const [visible, setVisible] = useState<string | null>(defaultValue)

    const clickHandler = (key: string) => {
        onChange && onChange(key)
        setVisible(key)
    }

    return (
        <div className={style.tabs}>
            <div className={style.menu}>
                {topExtra && <div className={style.extra}>{topExtra}</div>}
                <Menu visible={visible} clickHandler={clickHandler}>
                    {children}
                </Menu>
            </div>
            <Container visible={visible}>{children}</Container>
        </div>
    )
}

export default Tabs
