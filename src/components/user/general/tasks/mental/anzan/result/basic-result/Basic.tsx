import React from 'react';
import styled from "styled-components";
import {CardWrapper} from "../../../../layouts/result/homework/_new/details/card/Card";
import { TrophyOutlined } from '@ant-design/icons';

const BasicResultWrapper = styled(CardWrapper)`
  .card{
    grid-template-columns: 50px 1fr 1fr 1fr;

    &.multi{
      grid-template-columns: 50px 1fr 1fr 1fr 1fr;
    }

    .exercises{
      font-size: 30px;
      grid-column-start: 1;
      grid-column-end: 5;
      white-space: nowrap;
      overflow-x: auto;
      overflow-y: hidden;
    }
    .exercises-multiplication{
      font-size: 50px;
    }
  }
`;

interface BasicResultProps {
    total: any;
    setting: any;
    keyExercise: number;
    isMultiplication: boolean;
}

const BasicResult: React.FC<BasicResultProps> = ({total, isMultiplication, keyExercise, setting}) => {
    return (
        <BasicResultWrapper>
            <div className={`card ${isMultiplication ? 'multi' : ''}`}>
                <div className="number">
                    #{keyExercise}
                </div>
                <div className={`trophy ${total.result ? 'success' : 'danger'}`}>
                    <TrophyOutlined />
                </div>
                {isMultiplication ?
                    <div className="exercises-multiplication">
                        {total.exercise[0]}{setting.mode === 'multiply' ? ' * ' : ' / '}{total.exercise[1]}
                    </div> : null
                }
                <div className="answer">
                    {total.answer}
                </div>
                <div className={`user ${total.result ? 'success' : 'danger'}`}>
                    {total.user || 'Пусто'}
                </div>
                {!isMultiplication ?
                    <div className="exercises">
                        {total.exercise.join(', ')}
                    </div> : null
                }
            </div>
        </BasicResultWrapper>
    );
};

export default BasicResult;