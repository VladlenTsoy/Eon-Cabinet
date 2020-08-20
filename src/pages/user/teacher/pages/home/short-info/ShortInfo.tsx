import React from 'react';
import Statistic from "./statistic/Statistic";
import QuickNotice from "./quick-notice/QuickNotice";
import styled from "styled-components";
import Advertising from "./statistics-chart/StatisticsChart";

const ShortInfoWrapper = styled.div`
  display: grid;
  grid-gap: 15px;
  grid-template-columns: 1fr 1fr 1fr;
  margin-bottom: 1.5rem;
  
  div.ant-card{
    margin-bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    
    .ant-card-body{
      width: 100%;
    }
  }
  
  @media (max-width: 991.98px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
  }

`;

/**
 * Иформационный блок на главной странице
 *
 * @constructor
 */
const ShortInfo: React.FC = () => {
    return <ShortInfoWrapper>
        <QuickNotice/>
        <Statistic/>
        <Advertising/>
    </ShortInfoWrapper>;
};

export default ShortInfo;