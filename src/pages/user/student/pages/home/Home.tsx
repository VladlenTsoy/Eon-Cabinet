import React from 'react';
import Olympiad from "./olympiad/Olympiad";
import Homework from "./homework/Homework";
import Statistic from "./statistic/Statistic";
import styled from "styled-components"

const HomeStyled = styled.div`
  max-width: 900px;
  margin: 0 auto;
`

const Home: React.FC = () => {
    return <HomeStyled>
        <Statistic/>
        <Homework/>
        <Olympiad/>
    </HomeStyled>
};

export default Home;