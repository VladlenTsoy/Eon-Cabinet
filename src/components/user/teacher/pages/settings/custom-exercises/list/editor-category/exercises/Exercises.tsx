import React from 'react';
import styled from "styled-components";

const ExercisesStyled = styled.div`
  h2 {
    font-size: 18px;
  }
  
  p {
    display: inline-block;
    font-size: 16px;
    padding: 0.25rem 0.5rem;
    color: #fff;
    border-radius: 10px;
    background: ${props => props.theme.color_primary};
    
    :not(:last-child) {
      margin-right: 0.5rem;
    }
  }
`

interface ExercisesProps {
    record: any
}

const Exercises: React.FC<ExercisesProps> = ({record}) => {
    return <ExercisesStyled>
        <h2>Примеры</h2>
        {
            record.exercises.map(
                (exercies: any, key: number) => record.mode === "plus-minus" ?
                    <p key={key}>{exercies.join(', ')}</p> :
                    <p key={key}>{exercies[0]}{record.mode === "divide" ? ' ÷ ' : ' * '}{exercies[1]}</p>
            )
        }
    </ExercisesStyled>;
};

export default Exercises;