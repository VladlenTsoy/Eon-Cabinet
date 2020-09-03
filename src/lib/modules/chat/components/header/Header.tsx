import React from "react"
import styled from "styled-components"
import More from "./more/More"
import List from "./list/List"
import {Contact} from "../../interfaces/Contact"

const HeaderStyled = styled.div`
    text-align: center;
    font-size: 16px;
    font-weight: 900;
    // border-bottom: 1px solid ${(props) => props.theme.light_color_border};
    //color: ${(props) => props.theme.color_black};

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

interface HeaderProps {
    close: () => void
    contact: Contact | null
    back: () => void
}

const Header: React.FC<HeaderProps> = ({contact, back, close}) => {
    return (
        <HeaderStyled>
            {contact ? (
                <More back={back} contact={contact} close={close}/>
            ) : (
                <List close={close}/>
            )}
        </HeaderStyled>
    )
}

export default React.memo<HeaderProps>(Header)
