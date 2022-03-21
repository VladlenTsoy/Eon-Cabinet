import React from "react"
import styles from "./HeaderLanguage.module.less"
import SelectLanguage from "../components/select-language/SelectLanguage"

const HeaderLanguage = () => {
    return <div className={styles.header}>
        <SelectLanguage />
    </div>
}

export default HeaderLanguage
