import React from 'react';
import styled from "styled-components";
import {useSelector} from "react-redux";
import {game} from "../../../../../../../../store/game/reducer";

const TitleWrapper = styled.div`
  text-align: center;
  font-size: 90px;
  font-weight: 600;
  line-height: 1;
  animation-name: fadeInUp;
  animation-delay: 4s;
  animation-duration: 2s;
  animation-fill-mode: both;
  box-shadow: 0 5px 10px 0 rgba(0,0,0,0.1);
  background: #fff;
  border-radius: 500rem;
  padding: 0.5rem 3rem;
  
  @media (max-width: 576px) {
    font-size: 40px;
  }
`;

interface TitleProps {

}

const Title: React.FC<TitleProps> = () => {
    const {stats} = useSelector(game);

    const result: boolean = stats.all !== 0 && stats.all === stats.success;

    return <TitleWrapper>
        {result ? 'Победа!' : 'Неудача!'}
    </TitleWrapper>;
};

export default Title;