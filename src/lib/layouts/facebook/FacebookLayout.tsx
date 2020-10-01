import React, {useEffect} from "react"
import Header from "./header/Header"
import {useHistory} from "react-router-dom"
import {NavigationItemProps} from "./header/navigation/Navigation"
import styled from "styled-components"
import Footer from "./footer/Footer"
import {useScreenWindow} from "../../../hooks/use-screen-window.effect"
import {useDispatch, useSelector} from "react-redux"
import {appSelector, changeTitle} from "../../../store/common/app/appSlice"
import {Titles} from "../dashboard/header/laptop/title/Titles"

const LayoutStyled = styled.div`
    background: ${(props) => props.theme["@layout-body-background"]};
`

interface ContainerStyledProps extends React.HTMLAttributes<HTMLDivElement> {
    status: boolean
}

const ContainerStyled: React.FC<ContainerStyledProps> = styled.div<
    ContainerStyledProps
>`
    position: relative;
    overflow: hidden;
    max-width: ${(props) => props.theme.maxWidth};
    margin: 0 auto;
    min-height: 100vh;
    padding: calc(1.5rem + 60px) 1rem 1.5rem;
    width: 100%;
    //transition: background-color 0.3s ease-in-out;
    background: ${(props) =>
        props.status ? props.theme["@component-background"] : "none"};

    @media (max-width: 992px) {
        padding: calc(1rem + 60px) 0.5rem;
    }
`

const DrawContainerStyled = styled.div`
    position: fixed;
    left: 0;
    right: 0;
    top: 60px;
    bottom: 0;
    z-index: 5;
    pointer-events: none;

    > div {
        pointer-events: all;
    }

    @media (max-width: 767px) {
        top: 60px;
        bottom: 60px;
    }
`

interface FacebookLayout {
    navigations: NavigationItemProps[]
    sidebars: React.ReactFragment[]
    accountMenu: React.ReactFragment[]
}

const FacebookLayout: React.FC<FacebookLayout> = ({
    children,
    navigations,
    sidebars,
    accountMenu
}) => {
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
        <LayoutStyled>
            <Header
                navigations={navigations}
                sidebars={sidebars}
                accountMenu={accountMenu}
            />
            <DrawContainerStyled id="container" className="draw-container" />
            <ContainerStyled status={statusContainer}>
                {children}
            </ContainerStyled>
            {isBreakpoint && <Footer navigations={navigations} />}
        </LayoutStyled>
    )
}

export default FacebookLayout
