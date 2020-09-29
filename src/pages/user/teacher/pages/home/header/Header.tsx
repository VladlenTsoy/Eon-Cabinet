import React from "react"
import styled from "styled-components"
import {HomeOutlined, TrophyOutlined} from "@ant-design/icons"

const HeaderStyled = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
`

const IconStyled = styled.div`
    font-size: 25px;
    color: ${(props) => props.theme.color_main};
    margin-right: 0.5rem;
`

const TitleStyled = styled.h2`
    margin-bottom: 0;
    margin-right: auto;
    color: ${(props) => props.theme.color_main};
`

const TimeDateStyled = styled.div`
    color: ${(props) => props.theme.color_second};
`

interface HeaderProps {
    type: "homework" | "olympiad"
    title: string
    date: string
}

const Header: React.FC<HeaderProps> = ({type, title, date}) => {
    return (
        <HeaderStyled>
            <IconStyled>
                {type === "homework" && <HomeOutlined />}
                {type === "olympiad" && <TrophyOutlined />}
            </IconStyled>
            <TitleStyled>{title}</TitleStyled>
            <TimeDateStyled>{date}</TimeDateStyled>
        </HeaderStyled>
    )
}

export default Header
