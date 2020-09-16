import React from 'react';
import SilverStarLayout from "../../../../../layouts/_old/awards/silver-star/SilverStar.layout";
import styled from "styled-components";

const AwardsWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

const Awards: React.FC = () => {
    return <AwardsWrapper>
        <SilverStarLayout/>
    </AwardsWrapper>;
};

export default Awards;