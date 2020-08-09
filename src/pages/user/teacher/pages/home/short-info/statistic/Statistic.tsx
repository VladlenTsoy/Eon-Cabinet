import React from 'react';
import Students from "./students/Students";
import styled from "styled-components";
import Homework from "./homework/Homework";
import Groups from "./groups/Groups";

const StatisticWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 15px;
`;

const Statistic: React.FC = () => {
    return <StatisticWrapper>
        <Groups/>
        <Homework/>
        <Students/>
    </StatisticWrapper>;
};

export default Statistic;