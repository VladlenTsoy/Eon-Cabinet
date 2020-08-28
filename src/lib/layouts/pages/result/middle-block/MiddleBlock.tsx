import React from 'react';
import styled from "styled-components";

const TrophyWrapper: React.FC = styled.div`
  text-align: center;
  order: 2;
  
  @media (max-width: 992px) {
    order: 1;
    grid-column-start: 1;
    grid-column-end: 3;
  }  
  
  @media (max-width: 576px) {
    grid-column-end: 2;
  }
`;

const MiddleBlock: React.FC = ({children}) => {
    return <TrophyWrapper>
        {children}
    </TrophyWrapper>;
};

export default MiddleBlock;