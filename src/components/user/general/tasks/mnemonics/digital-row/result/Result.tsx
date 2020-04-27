import React from 'react';
import {useSelector} from "react-redux";
import styled from "styled-components";
import {CardWrapper} from "../../../layouts/result/_new/details/card/Card";
import { TrophyOutlined } from '@ant-design/icons';
import {useAddSpaceToString} from "../../../../../../../effects/use-add-space-to-string";

const ResultWrapper = styled(CardWrapper)`
  .card{
    grid-template-columns: 50px 80px 1fr;
    grid-template-rows: 1fr 1fr;
    
    .number{
      grid-row-start: 1;
      grid-row-end: 3;
    }
    
    .trophy{
      grid-row-start: 1;
      grid-row-end: 3;
    }
  }
`;

const ResultBlock = () => {
    const {totals} = useSelector((state: any) => state.game);
    const addSpaceToString = useAddSpaceToString();

    return totals.map((total: any, key: number) =>
        <ResultWrapper key={key}>
            <div className="card">
                <div className="number">
                    #{key}
                </div>
                <div className={`trophy ${total.result ? 'success' : 'danger'}`}>
                    <TrophyOutlined />
                </div>
                <div className="answer">
                    {addSpaceToString(total.answer)}
                </div>
                <div className={`user ${total.result ? 'success' : 'danger'}`}>
                    {addSpaceToString(total.user) || 'Пусто'}
                </div>
            </div>
        </ResultWrapper>
    );
};

export default ResultBlock;