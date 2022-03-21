import React from "react"
import styles from "./Header.module.less"
import Navigation, {NavigationItemProps} from "./navigation/Navigation"
import Sidebars from "./sidebars/Sidebars"
import LogoBlock from "./logo-block/LogoBlock"
import {useScreenWindow} from "../../../../hooks/use-screen-window.effect"

interface HeaderProps {
    navigations: NavigationItemProps[]
    sidebars: React.ReactFragment[]
    accountMenu: React.ReactFragment[]
}

const Header: React.FC<HeaderProps> = (
    {
        navigations,
        sidebars,
        accountMenu
    }
) => {
    const [, isBreakpoint] = useScreenWindow({breakpoint: "lg"})

    return (
        <div className={styles.header}>
            <div className={styles.container}>
                <LogoBlock />
                {!isBreakpoint && <Navigation menu={navigations} />}
                <Sidebars sidebars={sidebars} accountMenu={accountMenu} />
            </div>
        </div>
    )
}

export default Header
