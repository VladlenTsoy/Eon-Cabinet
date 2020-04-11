import React from 'react';
import styled from "styled-components";
import {FireLayout} from "../fire-layout";

const FireMainWrapper = styled(FireLayout)`
  animation-name: scaleUpDown;
  animation-duration: 3s;

  .main-fire {
    width: 100%;
    height: 100%;
    background-image: radial-gradient(farthest-corner at 10px 0, #ffc107 0%, #ef5a00 95%);
  }
  
  .particle-fire {
    top: 60%;
    left: 45%;
    width: 10px;
    height: 10px;
    animation-duration: 2s;
  }
  
  @keyframes scaleUpDown {
    0%,
    100% {
      transform: scaleY(1) scaleX(1);
    }
    50%,
    90% {
      transform: scaleY(1.1);
    }
    75% {
      transform: scaleY(0.95);
    }
    80% {
      transform: scaleX(0.95);
    }
  }
`;

const FireMain = () => {
    return <FireMainWrapper>
        <div className="main-fire"/>
        <div className="particle-fire"/>
    </FireMainWrapper>;
};

export default FireMain;