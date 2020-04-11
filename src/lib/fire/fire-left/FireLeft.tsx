import React from 'react';
import styled from "styled-components";
import {FireLayout} from "../fire-layout";

const FireLeftWrapper = styled(FireLayout)`
  animation-duration: 3s;
  
  .main-fire {
    top: 15%;
    left: -20%;
    width: 80%;
    height: 80%;
  }
  
  .particle-fire {
    top: 10%;
    left: 20%;
    width: 10%;
    height: 10%;
    animation-duration: 3s;
  }
`;

const FireLeft = () => {
    return <FireLeftWrapper>
        <div className="main-fire"/>
        <div className="particle-fire"/>
    </FireLeftWrapper>;
};

export default FireLeft;