import React from 'react';
import styled from "styled-components";
import FireLeft from "./fire-left/FireLeft";
import FireRight from "./fire-right/FireRight";
import FireMain from "./fire-main/FireMain";
import FireBottom from "./fire-bottom/FireBottom";

const FireWrapper = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  background-color: transparent;
  margin: 1em auto 2rem;

  &:before {
    content: "";
    position: absolute;
    top: -1rem;
    left: -1rem;
    right: -1rem;
    bottom: -1rem;
    border-radius: 50%;
    background: #e9ecef;
  }
`;

interface FireProps {
    type?: 'warning' | 'info' | 'danger' | 'success'
}

const Fire: React.FC<FireProps> = ({type= 'warning'}) => {
    return <FireWrapper>
        <FireLeft/>
        <FireMain/>
        <FireRight/>
        <FireBottom/>
    </FireWrapper>;
};

export default Fire;