import React from 'react';
import styled from "styled-components";

const StepsWrapper: React.FC = styled.div`
  margin: 3rem auto;
  overflow: hidden;
  overflow-x: auto;
  padding: 0.5rem;
  text-align: center;
  width: 100%;
  
  .container{
    display: inline-flex;
    align-items: center;
    padding: 0.5rem;
  }
`;

const Tabs: React.FC = ({children}) => {
    return <StepsWrapper>
        <div className="container">
            {children}
        </div>
    </StepsWrapper>;
};

export default Tabs;