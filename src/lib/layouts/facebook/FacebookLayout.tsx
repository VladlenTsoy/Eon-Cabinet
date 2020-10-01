import React from "react"
import Header from "./header/Header"
import {NavigationItemProps} from "./header/navigation/Navigation"
import styled from "styled-components"
import Footer from "./footer/Footer"
import {useScreenWindow} from "../../../hooks/use-screen-window.effect"
import {useSelector} from "react-redux"
import {appSelector} from "../../../store/common/app/appSlice"

const LayoutStyled = styled.div`
    background: ${props => props.theme['@layout-body-background']};
`

interface ContainerStyledProps extends React.HTMLAttributes<HTMLDivElement>{
    status: boolean
}

const ContainerStyled:React.FC<ContainerStyledProps> = styled.div<ContainerStyledProps>`
    position: relative;
    overflow: hidden;
    max-width: ${(props) => props.theme.maxWidth};
    margin: 0 auto;
    min-height: 100vh;
    padding: calc(1.5rem + 60px) 1rem 1.5rem;
    width: 100%;
    //transition: background-color 0.3s ease-in-out;
    background: ${props => props.status ? props.theme['@component-background'] :'none'};

    @media (max-width: 767px) {
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
    const {statusContainer} = useSelector(appSelector)
    const [, isBreakpoint] = useScreenWindow({breakpoint: "lg"})

    return (
        <LayoutStyled>
            <Header
                navigations={navigations}
                sidebars={sidebars}
                accountMenu={accountMenu}
            />
            <DrawContainerStyled id="container" className="draw-container" />
            <ContainerStyled status={statusContainer}>{children}</ContainerStyled>
            {isBreakpoint && <Footer navigations={navigations} />}
        </LayoutStyled>
    )
}

export default FacebookLayout
