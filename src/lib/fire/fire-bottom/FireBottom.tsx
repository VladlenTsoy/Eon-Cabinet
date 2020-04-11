import React from 'react';
import styled from "styled-components";

const FireBottomWrapper = styled.div`
  .main-fire {
    position: absolute;
    top: 30%;
    left: 20%;
    width: 75%;
    height: 75%;
    background-color: #ff7800;
    transform: scaleX(0.8) rotate(45deg);
    border-radius: 0 40% 100% 40%;
    filter: blur(10px);
    animation: glow 2s ease-out 0;
    animation-iteration-count: infinite;
    animation-fill-mode: both;
  }
  
  @keyframes glow {
    0%,
    100% {
      background-color: #ffc107;
    }
    50% {
      background-color: #ff7800;
    }
  }
`;

const FireBottom = () => {
    return <FireBottomWrapper>
        <div className="main-fire"/>
    </FireBottomWrapper>;
};

export default FireBottom;