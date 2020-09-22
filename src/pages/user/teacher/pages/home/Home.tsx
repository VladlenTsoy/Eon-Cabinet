import React from "react"
import styled from "styled-components"
import Homework from "./_homework/Homework"
import Olympiad from "./_olympiad/Olympiad"

const HomeContainerStyled = styled.div`
    max-width: 750px;
    margin: 0 auto;
    width: 100%;
`

/**
 * Главная страница учителя
 *
 * @constructor
 */
const Home: React.FC = () => {
    return (
        <HomeContainerStyled>
            <Homework/>
            <Olympiad/>
        </HomeContainerStyled>
    )
}

export default Home
