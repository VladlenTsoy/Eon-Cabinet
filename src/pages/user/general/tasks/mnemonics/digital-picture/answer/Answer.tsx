import React from 'react';
import {useSelector} from "react-redux";
import AnswerLayout from "../../../layouts/answer/Answer.layout";
import InputAnswer from "./input-answer/InputAnswer";
import styled from "styled-components";
import {gameSelector} from "../../../../../../../store/common/game/gameSplice";

const InputsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
  margin-bottom: 1rem;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const Answer: React.FC = () => {
    const {totals} = useSelector(gameSelector);

    const checkHandler = (values: any) => {
        const createdTotals = totals.map((total: any, key: number) => {
            const user = values.answer[key];
            const result = Number(total.exercise.number) === Number(values.answer[key].number);
            return {...total, user, result};
        });

        return {
            status: 'result',
            totals: createdTotals,
            success: createdTotals.filter((val: any) => val.result).length,
        };
    };

    return (
        <AnswerLayout
            cols={{span: 24}}
            checkHandler={checkHandler}
        >
            <InputsWrapper>
                {totals.map((total: any, key: number) =>
                    <InputAnswer total={total} key={key} totalKey={key}/>)
                }
            </InputsWrapper>
        </AnswerLayout>
    );
};

export default Answer;