import React from 'react';
import styled from "styled-components";
import {useSelector} from "react-redux";
import {game} from "../../../../../../../../../store/reducers/common/game/reducer";

interface CounterStyleProps {
    delay: number;
}

const CounterWrapper: React.FC<CounterStyleProps> = styled.div<CounterStyleProps>` 
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
    animation-delay: ${props => props.delay}ms;
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
    delay: number;
}

const Counter: React.FC<CounterProps> = ({delay}) => {
    const {stats} = useSelector(game);

    return <CounterWrapper delay={delay}>
        <div className="counter">
            {stats.success} <span className="slash">/</span> {stats.all}
        </div>
    </CounterWrapper>
};

export default React.memo(Counter);