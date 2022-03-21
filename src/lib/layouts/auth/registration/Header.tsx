import React from "react"
import {Link} from "react-router-dom"
import {Logo} from "../../../ui"
import SelectLanguage from "../components/select-language/SelectLanguage"
import {ArrowLeftOutlined} from "@ant-design/icons"
import {useLanguage} from "../../../../hooks/use-language"
import styles from "./Header.module.less"

const Header = () => {
    const {l} = useLanguage()

    return (
        <div className={styles.header}>
            <div className={styles.back}>
                <Link to="/">
                    <ArrowLeftOutlined /> {l("back")}
                </Link>
            </div>
            <div className={styles.logo}>
                <div>
                    <Logo to="/" />
                </div>
            </div>
            <div className={styles.language}>
                <SelectLanguage />
            </div>
        </div>
    )
}

export default Header
