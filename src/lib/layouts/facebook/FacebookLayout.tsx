import React from "react"
import Header from "./header/Header"
import {NavigationItemProps} from "./header/navigation/Navigation"
import styled from "styled-components"
import Footer from "./footer/Footer"
import {useScreenWindow} from "../../../hooks/use-screen-window.effect"

const LayoutStyled = styled.div`
    background: ${props => props.theme['@layout-body-background']};
`

const ContainerStyled = styled.div`
    position: relative;
    overflow: hidden;
    max-width: ${(props) => props.theme.maxWidth};
    margin: 0 auto;
    min-height: 100vh;
    padding: calc(1.5rem + 60px) 1rem 1.5rem;
    width: 100%;

    @media (max-width: 767px) {
        padding: calc(1rem + 60px) 0.5rem;
    }
`

const ScrollStyled = styled.div`
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
    const [, isBreakpoint] = useScreenWindow({breakpoint: "lg"})

    return (
        <LayoutStyled>
            <Header
                navigations={navigations}
                sidebars={sidebars}
                accountMenu={accountMenu}
            />
            <ScrollStyled id="container" className="draw-container" />
            <ContainerStyled>{children}</ContainerStyled>
            {isBreakpoint && <Footer navigations={navigations} />}
        </LayoutStyled>
    )
}

export default FacebookLayout
