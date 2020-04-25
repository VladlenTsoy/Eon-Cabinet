import React from 'react';
import styled from "styled-components";

const NumberWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 1rem;
  display: flex;
  justify-content: center;
  
  .number{
    font-size: 40px;
    font-weight: bold;
    background: ${props => props.theme['@layout-body-background']};
    color: ${props => props.theme.color_second};
    height: 50px;
    width: 50px;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transform: scale(1);
    animation: scaleFade 0.3s ease-in-out;
    animation-direction: normal;
  }
  
  @keyframes scaleFade{
    0%{
    transform: scale(0);
    }
    100%{
      transform: scale(1);
    }
  }
`;

interface NumberProps {
    current: number;
}

const Number:React.FC<NumberProps> = ({current}) => {
    return <NumberWrapper key={current}>
        <div className="number">{current}</div>
    </NumberWrapper>;
};

export default Number;