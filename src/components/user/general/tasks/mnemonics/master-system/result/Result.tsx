import React from 'react';
import {useSelector} from "react-redux";
import styled from "styled-components";
import {CardWrapper} from "../../../layouts/result/_new/details/card/Card";
import { TrophyOutlined } from '@ant-design/icons';

const ResultWrapper = styled(CardWrapper)`
  .card{
    grid-template-columns: 50px 1fr 1fr 1fr 1fr;
    
    .exercise-number{
      font-size: 50px;
    }
  }
`;

const ResultBlock = () => {
    const {totals} = useSelector((state: any) => state.game);

    return totals.map((total: any, key: any) =>
        <ResultWrapper key={key}>
            <div className="card">
                <div className="number">
                    #{key}
                </div>
                <div className={`trophy ${total.result ? 'success' : 'danger'}`}>
                    <TrophyOutlined />
                </div>
                <div className="exercise-number">
                    {total.exercise.number}
                </div>
                <div className="answer">
                    {total.exercise.word}
                </div>
                <div className={`user ${total.result ? 'success' : 'danger'}`}>
                    {total.user || 'Пусто'}
                </div>
            </div>
        </ResultWrapper>
    );
};

export default ResultBlock;