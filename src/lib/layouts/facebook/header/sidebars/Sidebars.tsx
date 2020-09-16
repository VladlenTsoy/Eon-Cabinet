import React from "react"
import styled from "styled-components"
import AccountMenu from "./account-menu/AccountMenu"

const SidebarsStyled = styled.div`
    height: 100%;
    padding: 0.5rem 1rem;
    display: flex;
    z-index: 5;

    > div:not(:last-child) {
        margin-right: 0.75rem;
    }
`

interface SidebarsProps {
    accountMenu: React.ReactFragment[]
    sidebars: React.ReactFragment[]
}

const Sidebars: React.FC<SidebarsProps> = ({sidebars, accountMenu}) => {
    return (
        <SidebarsStyled>
            {sidebars}
            <AccountMenu key="account-menu">
                {accountMenu}
            </AccountMenu>
        </SidebarsStyled>
    )
}

export default Sidebars
