import React from "react"
import styles from "./Sidebars.module.less"
import AccountMenu from "./account-menu/AccountMenu"

interface SidebarsProps {
    accountMenu: React.ReactFragment[]
    sidebars: React.ReactFragment[]
}

const Sidebars: React.FC<SidebarsProps> = ({sidebars, accountMenu}) => {
    return (
        <div className={styles.sidebars}>
            {sidebars}
            <AccountMenu key="account-menu">{accountMenu}</AccountMenu>
        </div>
    )
}

export default Sidebars
