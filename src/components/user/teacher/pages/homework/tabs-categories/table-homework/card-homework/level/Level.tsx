import React from 'react';
import styled from "styled-components";

const LevelStyled = styled.div`
  transition: all 0.3s ease-in-out;
  filter: grayscale(1);
  background: ${props => props.theme.gradient_primary};
  box-shadow: ${props => props.theme.shadow_primary};
  text-align: center;
  padding: 1rem;
  border-radius: 5px;
  position: relative;
  transform: scale(1.1);
  left: 7.5px;

  span{
    display: block;    
    color: #fff;
  }

  .number{
    font-size: 55px;
    font-weight: 900;
    line-height: 1;
    margin-bottom: 0.25rem;
  }

  .title{
    font-size: 16px;
    line-height: 1;
  }
  
  @media (max-width: 1600px) {
    transform: scale(1);
    left: 0;
    
    .number{
      font-size: 45px;
    }    
  }
  
  @media (max-width: 576px) {
    padding: 1rem 0;
    
    .number{
      font-size: 35px;
    }    
    
    .title{
      font-size: 14px;
    }
  }
`;

interface LevelProps {
    level: number;
}

const Level:React.FC<LevelProps> = ({level}) => {
    return <LevelStyled className="level">
        <span className="number">{level}</span>
        <span className="title">Уровень</span>
    </LevelStyled>;
};

export default Level;