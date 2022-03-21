import React from "react"
import styles from "./Footer.module.less"

const Footer = () => {
    const d = new Date()
    const currentYear = d.getFullYear()

    return <div className={styles.footer}>
        Copyright &copy; {currentYear} Eon. Developed by Vladlen
    </div>
}

export default Footer
