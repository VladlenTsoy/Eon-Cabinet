import React from 'react';
import styled from "styled-components";

const DoubleOutputWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 100%;
    align-items: center;
`;

const DoubleOutput:React.FC = ({children}) => {
  return <DoubleOutputWrapper>
      {children}
  </DoubleOutputWrapper>
};

export default DoubleOutput;