import React from 'react';
import styled from "styled-components";
import {TrophyOutlined} from '@ant-design/icons';

const DoubleResultWrapper = styled.div`
  .number, .trophy{
    grid-row-start: 1;
    grid-row-end: 3;
    display: flex;
    align-items: center;
  }
  
  .position{
    color: ${props => props.theme.light_color_border};
  }
`;

interface DoubleResultProps {
    total: any;
    setting: any;
    keyExercise: number;
    isMultiplication: boolean;
}

const DoubleResult: React.FC<DoubleResultProps> = ({total, isMultiplication, keyExercise, setting}) => {
    const result = total[0].result && total[1].result;
    return <DoubleResultWrapper>
        <div className="number">
            {keyExercise + 1}
        </div>
        <div className={`trophy ${result ? 'warning' : 'second'}`}>
            <TrophyOutlined/>
        </div>
        <div className="position">Л</div>
        <div className="answer">
            {total[0].answer}
        </div>
        <div className={`user ${total[0].result ? 'success' : 'danger'}`}>
            {total[0].user || 'Пусто'}
        </div>
        <div className="exercises">
            {isMultiplication ?
                total[0].exercise[0] + (setting.mode === 'multiply' ? ' * ' : ' / ') + total[0].exercise[1] :
                total[0].exercise.join(', ')
            }
        </div>
        <div className="position">П</div>
        <div className="answer">
            {total[1].answer}
        </div>
        <div className={`user ${total[1].result ? 'success' : 'danger'}`}>
            {total[1].user || 'Пусто'}
        </div>
        <div className="exercises">
            {isMultiplication ?
                total[1].exercise[0] + (setting.mode === 'multiply' ? ' * ' : ' / ') + total[1].exercise[1] :
                total[1].exercise.join(', ')
            }
        </div>
    </DoubleResultWrapper>
};

export default DoubleResult;