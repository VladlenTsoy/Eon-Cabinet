import styled from "styled-components";

export const FireLayout = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  animation-name: shake;
  animation-delay: 0;
  animation-timing-function: ease-out;
  animation-fill-mode: both;
  animation-iteration-count: infinite;

  .main-fire {
    position: absolute;
    background-color: #ffc107;
    transform: scaleX(0.8) rotate(45deg);
    border-radius: 0 40% 60% 40%;
    filter: drop-shadow(0 0 10px #d43322);
  }
  
  .particle-fire {
    position: absolute;
    background-color: #ffc107;
    transform: scaleX(0.8) rotate(45deg);
    border-radius: 50%;
    filter: drop-shadow(0 0 10px #d43322);
    animation-name: particleUp;
    animation-delay: 0;
    animation-fill-mode: both;
    animation-timing-function: ease-out;
    animation-iteration-count: infinite;
  }
  
  @keyframes shake {
    0%,
    100% {
      transform: skewX(0) scale(1);
    }
    50% {
      transform: skewX(5deg) scale(0.9);
    }
  }
    
  @keyframes particleUp {
    0% {
      opacity: 0;
    }
    20% {
      opacity: 1;
    }
    80% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      top: -100%;
      transform: scale(0.5);
    }
  }
`;