import React, {useEffect} from "react"
import Header from "./header/Header"
import {useHistory} from "react-router-dom"
import {NavigationItemProps} from "./header/navigation/Navigation"
import styles from "./FacebookLayout.module.less"
import Footer from "./Footer"
import {useScreenWindow} from "../../../hooks/use-screen-window.effect"
import {useDispatch, useSelector} from "react-redux"
import {appSelector, changeTitle} from "store/app/appSlice"
import {Titles} from "../../../utils/Titles"
import cn from "classnames"

interface FacebookLayout {
    navigations: NavigationItemProps[]
    sidebars: React.ReactFragment[]
    accountMenu: React.ReactFragment[]
}

const FacebookLayout: React.FC<FacebookLayout> = (
    {
        children,
        navigations,
        sidebars,
        accountMenu
    }
) => {
    const history = useHistory()
    const {statusContainer} = useSelector(appSelector)
    const [, isBreakpoint] = useScreenWindow({breakpoint: "lg"})

    const dispatch = useDispatch()

    useEffect(() => {
        if (history.listen) {
            history.listen((location: any) => {
                if (Titles[location.pathname])
                    dispatch(changeTitle(Titles[location.pathname]))
            })

            if (Titles[history.location.pathname])
                dispatch(changeTitle(Titles[history.location.pathname]))

            return () => {
                // @ts-ignore
                history.listen = null
            }
        }
    }, [history, dispatch])

    return (
        <div className={styles.layout}>
            <Header
                navigations={navigations}
                sidebars={sidebars}
                accountMenu={accountMenu}
            />
            <div id="container" className={cn(styles.drawContainer, "draw-container")} />
            <div className={cn(styles.container, {[styles.hide]: !statusContainer})}>
                {children}
            </div>
            {isBreakpoint && <Footer navigations={navigations} />}
        </div>
    )
}

export default FacebookLayout
