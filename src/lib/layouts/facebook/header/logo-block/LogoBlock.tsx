import React from "react"
import {Logo} from "lib/ui"
import styles from "./LogoBlock.module.less"
import HeaderProfile from "./profile/HeaderProfile"

const LogoBlock = () => {
    return (
        <div className={styles.logoBlock}>
            <div className={styles.logo}>
                <Logo to="/" />
            </div>
            <div className={styles.profile}>
                <HeaderProfile />
            </div>
        </div>
    )
}

export default LogoBlock
