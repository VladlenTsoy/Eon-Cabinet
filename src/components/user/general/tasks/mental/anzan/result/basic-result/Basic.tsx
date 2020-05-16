import React from 'react';
import styled from "styled-components";
import {TrophyOutlined} from '@ant-design/icons';

const BasicResultWrapper = styled.div`
  .number {
    color: ${props => props.theme.color_second};
    font-size: 30px;
  }
  .trophy {
    font-size: 30px;
  }
  
  .answer, .user{
    font-size: 30px;  
  }

  .exercises{
    font-size: 30px;
    white-space: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    background: ${props => props.theme.color_border}33;
  }
  
  .exercises-multiplication{
    font-size: 50px;
  }
`;

interface BasicResultProps {
    total: any;
    setting: any;
    keyExercise: number;
    isMultiplication: boolean;
}

const BasicResult: React.FC<BasicResultProps> = ({total, isMultiplication, keyExercise, setting}) => {
    return <BasicResultWrapper>
        <div className="number">
            {keyExercise + 1}
        </div>
        <div className={`trophy ${total.result ? 'warning' : 'danger'}`}>
            <TrophyOutlined/>
        </div>
        {isMultiplication &&
        <div className="exercises-multiplication">
            {total.exercise[0]}{setting.mode === 'multiply' ? ' * ' : ' / '}{total.exercise[1]}
        </div>
        }
        <div className="answer">
            {total.answer}
        </div>
        <div className={`user ${total.result ? 'success' : 'danger'}`}>
            {String(total.user) || 'Пусто'}
        </div>
        {!isMultiplication &&
        <div className="exercises">
            {total.exercise.join(', ')}
        </div>
        }
    </BasicResultWrapper>
};

export default BasicResult;