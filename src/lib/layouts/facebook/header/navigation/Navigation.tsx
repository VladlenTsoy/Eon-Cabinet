import React from "react"
import {Link, useLocation} from "react-router-dom"
import {Tooltip} from "antd"
import styled from "styled-components"
import {useScreenWindow} from "../../../../../hooks/use-screen-window.effect"

const NavigationStyled = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    align-items: center;
    justify-content: center;
    display: flex;
    height: 100%;

    nav {
        height: 100%;
        display: flex;
    }

    li {
        list-style: none;
        height: 100%;
        display: flex;
        align-items: center;
        padding: 0.3rem 0;

        :not(:last-child) {
            margin-right: 0.5rem;
        }

        a {
            color: ${(props) => props.theme.color_main};
            border-radius: 5px;
            padding-right: 3rem;
            padding-left: 3rem;
            font-size: 30px;
            height: 100%;
            display: flex;
            align-items: center;
            transition: all 0.3s ease-out;
        }
    }

    li:not(.active) a:hover {
        background: ${(props) => props.theme["@layout-body-background"]};
    }

    li.active {
        border-bottom: 3px solid ${(props) => props.theme.color_primary};

        a {
            color: ${(props) => props.theme.color_primary};
        }
    }

    @media (max-width: 1200px) {
        li {
            a {
                padding-right: 2rem;
                padding-left: 2rem;
            }
        }
    }

    @media (max-width: 992px) {
        width: 100%;
        position: relative;

        nav {
            width: 100%;
        }

        li {
            width: 100%;

            a {
                width: 100%;
                justify-content: center;
                padding-right: 0;
                padding-left: 0;
                font-size: 25px;
            }
        }
    }
`

export interface NavigationItemProps {
    link: string
    title: string
    icon: React.ReactFragment
    iconActive: React.ReactFragment
}

interface NavigationProps {
    menu: NavigationItemProps[]
}

const Navigation: React.FC<NavigationProps> = ({menu}) => {
    const location = useLocation()
    const [, isBreakpoint] = useScreenWindow({breakpoint: "md"})

    const arr = location.pathname.split("/")
    arr.splice(0,1)

    const updateActive = (link: string) => {
        link = link.replace('/', '')
        return arr.includes(link)
    }

    return (
        <NavigationStyled>
            <nav>
                {menu.map((item) => (
                    <Tooltip
                        {...(isBreakpoint ? {visible: false} : {})}
                        placement="bottom"
                        title={item.title}
                        key={item.link}
                    >
                        <li className={updateActive(item.link) ? "active" : ""}>
                            <Link to={item.link}>
                                {updateActive(item.link)
                                    ? item.iconActive
                                    : item.icon}
                            </Link>
                        </li>
                    </Tooltip>
                ))}
            </nav>
        </NavigationStyled>
    )
}

export default React.memo(Navigation)
