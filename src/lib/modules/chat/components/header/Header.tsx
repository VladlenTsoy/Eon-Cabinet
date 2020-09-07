import React from "react"
import styled from "styled-components"

const HeaderStyled = styled.div`
    text-align: center;
    font-size: 16px;
    font-weight: 900;

    > div {
        display: grid;
        grid-template-columns: 50px 1fr 50px;

        > div {
            padding: 0.5rem 0.5rem;

            &.back,
            &.close {
                cursor: pointer;

                :hover {
                    color: ${(props) => props.theme.color_primary};
                }
            }
        }
    }
`

const Header: React.FC = ({children}) => {
    return (
        <HeaderStyled>
            {children}
        </HeaderStyled>
    )
}

export default Header
