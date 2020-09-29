import React from "react"
import styled from "styled-components"
import Navigation, {NavigationItemProps} from "./navigation/Navigation"
import Sidebars from "./sidebars/Sidebars"
import LogoBlock from "./logo-block/LogoBlock"
import {useScreenWindow} from "../../../../hooks/use-screen-window.effect"

const HeaderStyled = styled.div`
    height: 60px;
    background: ${(props) => props.theme["@component-background"]};
    box-shadow: rgba(0, 0, 0, 0.05) 0 2px 15px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    //z-index: 1001;
    z-index: 500;

    @media (max-width: 576px) {
        height: 55px;
    }
`

interface HeaderProps {
    navigations: NavigationItemProps[]
    sidebars: React.ReactFragment[]
    accountMenu: React.ReactFragment[]
}

const Header: React.FC<HeaderProps> = ({
    navigations,
    sidebars,
    accountMenu
}) => {
    const [, isBreakpoint] = useScreenWindow({breakpoint: "lg"})

    return (
        <HeaderStyled>
            <LogoBlock />
            {!isBreakpoint && <Navigation menu={navigations} />}
            <Sidebars sidebars={sidebars} accountMenu={accountMenu} />
        </HeaderStyled>
    )
}

export default Header
