import React from 'react';
import styled from "styled-components";

const CounterWrapper = styled.div` 
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  margin-top: 2rem;
  
  .counter{
    font-size: 40px;
    font-weight: 900;
    border-radius: 500rem;
    color: #ffffff;
    background: #ff4755;
    animation-name: fadeInDown;
    animation-delay: 4s;
    animation-duration: 2s;
    animation-fill-mode: both;
    padding: 0.25rem 2rem;
    box-shadow: 0 3px 10px #ff475563;
    
    .slash{
      opacity: 0.5;
    }
  }
`;

interface CounterProps {

}

const Counter:React.FC<CounterProps> = () => {
    return <CounterWrapper>
        <div className="counter">
            50 <span className="slash">/</span> 50
        </div>
        </CounterWrapper>
};

export default React.memo(Counter);