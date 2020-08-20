import React from 'react';
import styled from "styled-components";

const StatisticsChartStyled = styled.div`
  height: 100%;
  overflow: hidden;
  background: ${props => props.theme['@component-background']};
  border-radius: 10px;
  box-shadow: 0 5px 10px 0 rgba(0,0,0,0.1);
  padding: 0.5rem 0;
`

const StatisticsChart = () => {
    return <StatisticsChartStyled>

    </StatisticsChartStyled>;
};

export default StatisticsChart;