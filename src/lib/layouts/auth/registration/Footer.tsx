import React from "react"
import styles from "./Footer.module.less"

const Footer = () => {
    return (
        <div className={styles.footer}>
            Copyright © 2020 Eon. Developed by Vladlen
        </div>
    )
}

export default React.memo(Footer)
