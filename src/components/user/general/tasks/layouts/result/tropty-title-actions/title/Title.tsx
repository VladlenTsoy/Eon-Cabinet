import React from 'react';
import styled from "styled-components";
import {useSelector} from "react-redux";

const TitleWrapper:any = styled.div<any>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 5;
  
  .counter{
    display: flex;
    align-items: flex-end;
    line-height: 1;
    font-size: 50px;
    font-weight: 900;
    color: ${props => props.theme.color_second};
  }

  .title{
    font-size: 150px;
    font-weight: 600;
    color: ${(props: any) => props.result === 'true' ? '#ffba57' : props.theme.color_main};
    line-height: 1;
  }
  
  @media (max-width: 768px) {
    .title{
      font-size: 75px;
    }
  }
`;

interface TitleProps {
}

const Title: React.FC<TitleProps> = () => {
    const {game} = useSelector((state: any) => state);
    const {stats} = game;
    const result: boolean = stats.all && stats.all === stats.success;

    return <TitleWrapper result={result.toString()}>
        <div className="counter">{stats.all}/{stats.success}</div>
        <div className={`title animated ${result ? 'tada' : 'flash'}`}>{result ? 'Победа' : 'Неудача'}!</div>
    </TitleWrapper>
};

export default React.memo(Title);