import React from 'react';
import styled from "styled-components";

const CounterWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  order: 3;

  > div {
    span {
      display: block;
      text-align: center;
    
      &.title {
        color: ${props => props.theme.color_second};
      }
    
      &.count{
        font-size: 50px;
        font-weight: 600;
      }
    }
  }
  
  
  @media (max-width: 768px) {
    order: 2;
    
    > div {
      span {
        &.count{
          font-size: 35px;
        }   
      }
    }
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

interface CounterProps {
    homework: any;
}

const Counter: React.FC<CounterProps> = ({homework}) => {
    return <CounterWrapper>
        <div>
            <span className="title">Всего</span>
            <span className="count">{homework.count_tasks}</span>
        </div>
        <div>
            <span className="title">Выполенно</span>
            <span className="count">{homework.count_completed_tasks}</span>
        </div>
    </CounterWrapper>;
};

export default Counter;