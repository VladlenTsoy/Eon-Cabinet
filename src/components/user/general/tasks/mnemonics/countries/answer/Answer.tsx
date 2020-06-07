import React from 'react';
import {useSelector} from "react-redux";
import AnswerLayout from "../../../layouts/answer/Answer.layout";
import InputAnswer from "./input-answer/InputAnswer";
import styled from "styled-components";
import {gameSelector} from "../../../../../../../store/reducers/common/game/gameSplice";

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
    const {setting, totals} = useSelector(gameSelector);

    const namePreparation = (name: string): string => {
        return String(name)
            .toLowerCase()
            .replace(/ё/g, 'е')
            .replace(/\s+/g, '');
    };

    const checkHandler = (values: any) => {
        const createdTotals = totals.map((total: any, key: number) => {
            let user = values.answer[key];
            let result = namePreparation(total.exercise.country) === namePreparation(values.answer[key].country);

            if (Number(setting.mode) > 1)
                result = result && namePreparation(total.exercise.capital) === namePreparation(values.answer[key].capital);

            return {...total, user, result};
        });

        return {
            totals: createdTotals,
            status: 'result',
            success: createdTotals.filter((val: any) => val.result).length,
        };
    };

    return <AnswerLayout
        cols={{span: 24}}
        checkHandler={checkHandler}
    >
        <InputsWrapper>
            {totals.map((total: any, key: number) =>
                <InputAnswer total={total} key={key} totalKey={key}/>)
            }
        </InputsWrapper>
    </AnswerLayout>;
};

export default Answer;