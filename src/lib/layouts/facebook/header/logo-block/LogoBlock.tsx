import React from "react"
import {Logo} from "lib/ui"
import styled from "styled-components"
import HeaderProfile from "../../../dashboard/header/items/profile/HeaderProfile"

const LogoBlockStyled = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    z-index: 5;

    .logo {
        height: 100%;
        width: 76px;
        padding: 0.5rem 1rem;
    }

    @media (max-width: 576px) {
        .logo {
            display: none;
        }

        .profile {
            margin-left: 0.5rem;
        }
    }
`

const LogoBlock = () => {
    return (
        <LogoBlockStyled>
            <div className="logo">
                <Logo to="/" />
            </div>
            <div className="profile">
                <HeaderProfile />
            </div>
        </LogoBlockStyled>
    )
}

export default LogoBlock
