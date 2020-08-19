import React from 'react';
import styled from "styled-components";
import Level from "./level/Level";
import Actions from "./actions/Actions";
import Information from "./information/Information";
import {Homework} from "../../../../../../../../../lib/types/teacher/Homework";

const CardStyled = styled.div`
  background: ${props => props.theme['@component-background']};
  box-shadow: 0 5px 10px 0 rgba(0,0,0,0.1);
  display: grid;
  grid-template-columns: 135px 1fr repeat(5, 115px);
  border-radius: 10px;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  padding-right: 1rem;
  
  :hover{
    .level{
      filter: grayscale(0);
    }
  }
  
  @media (max-width: 1600px) {
    grid-template-columns: 95px 1fr repeat(5, 115px);
    gap: 0.5rem;
    padding-right: 0.5rem;
  }
  
  @media (max-width: 1200px) {
    grid-template-columns: 95px 1fr repeat(5, 65px);
  }
    
  @media (max-width: 992px) {
    grid-template-columns: 95px 1fr 40px;
    padding-right: 1rem;
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 75px 1fr 40px;
  }
`;

interface CardHomeworkProps {
    homework: Homework
}

const CardHomework: React.FC<CardHomeworkProps> = ({homework}) => {
    return <CardStyled>
        <Level level={homework.level}/>
        <Information
            created_at={homework.created_at}
            description={homework.description}
        />
        <Actions homework={homework}/>
    </CardStyled>;
};

export default CardHomework;