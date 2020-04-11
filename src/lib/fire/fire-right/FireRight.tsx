import React from 'react';
import styled from "styled-components";
import {FireLayout} from "../fire-layout";

export const FireRightWrapper = styled(FireLayout)`
  animation-duration: 2s;
  
  .main-fire {
    top: 15%;
    right: -25%;
    width: 80%;
    height: 80%;
  }
  
  .particle-fire {
    top: 45%;
    left: 50%;
    width: 15px;
    height: 15px;
    animation-duration: 2s;
  }
`;

const FireRight = () => {
    return <FireRightWrapper>
        <div className="main-fire"/>
        <div className="particle-fire"/>
    </FireRightWrapper>;
};

export default FireRight;