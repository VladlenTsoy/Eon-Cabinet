import React from 'react';
import styled from "styled-components";
import WordDetails from "../word-details/WordDetails";

export const CardWrapper = styled.div`
  .card{
    display: grid;
    grid-gap: 0 1rem;
    grid-template-columns: 50px 1fr 1fr 1fr;
    background: ${props => props.theme['@component-background']};
    padding: 1rem;
    border-radius: 10px;
    box-shadow: 0 5px 10px 0 rgba(0,0,0,0.1);
    margin-bottom: 2rem;
    align-items: center;
    
    .number{
      font-size: 35px;
      color: ${props => props.theme.color_second};
    }
    
    .trophy{
      font-size: 75px;
      
      &.success{
        color: ${props => props.theme.color_warning};
      }
      &.danger{
        color: ${props => props.theme.color_minimal};
      }
    }
    
    .answer{
      font-size: 50px;
    }
    
    .user{
      font-size: 50px;
      &.success{
        color: ${props => props.theme.color_success};
      }
      &.danger{
        color: ${props => props.theme.color_danger};
      }
    }
    
    .exercise{
      grid-column-start: 1;
      grid-column-end: 5;
    }
  }
  
  @media (max-width: 768px) {
    .card{
      grid-template-columns: 30px 1fr 1fr 1fr;
      padding: 0.75rem;
      grid-gap: 0 0.5rem;

      .number{
        font-size: 16px;
      }
      .trophy{
        font-size: 25px;
      }
      .answer{
        font-size: 20px;
      }
      .user{
        font-size: 20px;
      }
    }
  
  }
`;

interface CardProps {
    type: 'word';
    keyExercise: number;
    user: string;
    answer: string;
    result: boolean;
}

const Card: React.FC<CardProps> = ({type, keyExercise, result, answer, user}) => {
    return <CardWrapper>
        <WordDetails
            user={user}
            result={result}
            answer={answer}
            keyExercise={keyExercise}
        />
    </CardWrapper>;
};

export default Card;