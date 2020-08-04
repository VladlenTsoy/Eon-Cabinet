import React from 'react';
import styled from "styled-components";
import {useSelector} from "react-redux";
import {gameSelector} from "../../../../../../../../../store/common/game/gameSplice";

interface TitleStyleProps {
    delay: number;
}

const TitleWrapper:React.FC<TitleStyleProps> = styled.div<TitleStyleProps>`
  text-align: center;
  font-size: 70px;
  font-weight: 600;
  line-height: 1;
  animation-name: fadeInUp;
  animation-delay: ${props => props.delay}ms;
  animation-duration: 2s;
  animation-fill-mode: both;
  box-shadow: 0 5px 10px 0 rgba(0,0,0,0.1);
  background: ${props => props.theme['@component-background']};
  border-radius: 500rem;
  padding: 0.5rem 3rem;
  margin: 0 auto;
  max-width: 450px;
  
  @media (max-width: 576px) {
    font-size: 40px;
  }
`;

interface TitleProps {
    delay: number;
}

const Title: React.FC<TitleProps> = ({delay}) => {
    const {stats} = useSelector(gameSelector);

    const result: boolean = stats.all !== 0 && stats.all === stats.success;

    return <TitleWrapper delay={delay}>
        {result ? 'Победа!' : 'Неудача!'}
    </TitleWrapper>;
};

export default Title;