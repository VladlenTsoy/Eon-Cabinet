import React from "react"
import {Link} from "react-router-dom"
import {Logo} from "../../../../ui"
import SelectLanguage from "../../components/select-language/SelectLanguage"
import styled from "styled-components"
import {ArrowLeftOutlined} from "@ant-design/icons"
import {useLanguage} from "../../../../../hooks/use-language"

const HeaderStyled = styled.div`
    padding: 0 1rem;
    box-shadow: rgba(0, 0, 0, 0.05) 0 2px 15px 0;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
`

const BackButtonStyled = styled.div`
    font-size: 20px;
    display: flex;
    align-items: center;

    a {
        color: ${(props) => props.theme.color_main};
    }

    a:hover {
        color: ${(props) => props.theme.color_primary};
    }
`

const LogoStyled = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    > div {
        width: 76px;
        padding: 0.5rem 1rem;
    }
`

const LanguagesStyled = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`

const Header = () => {
    const {l} = useLanguage()

    return (
        <HeaderStyled>
            <BackButtonStyled>
                <Link to="/">
                    <ArrowLeftOutlined /> {l("back")}
                </Link>
            </BackButtonStyled>
            <LogoStyled>
                <div>
                    <Logo to="/" />
                </div>
            </LogoStyled>
            <LanguagesStyled>
                <SelectLanguage />
            </LanguagesStyled>
        </HeaderStyled>
    )
}

export default Header
