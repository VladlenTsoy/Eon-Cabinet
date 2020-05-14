import React from 'react';
import AnswerLayout from "../../../layouts/answer/Answer.layout";
import {useSelector} from "react-redux";
import InputAnswer from "./input-answer/InputAnswer";
import styled from "styled-components";
import moment from "moment";
import {totalsSelect} from "../../../../../../../store/tasks/totals/reducer";
import {settingAnzan} from "../../../../../../../store/tasks/setting/reducer";

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
    const totals:any = useSelector(totalsSelect);
    const setting = useSelector(settingAnzan);

    const namePreparation = (name: string): string => {
        return String(name)
            .toLowerCase()
            .replace(/ё/g, 'е')
            .replace(/\s+/g, '');
    };

    const checkHandler = (values: any) => {
        let _totals = totals.map((total: any, key: number) => {
            let user = values.answer[key];
            let result = namePreparation(total.exercise.full_name) === namePreparation(values.answer[key].full_name);

            if (Number(setting.mode) > 1) {
                result = result && moment(total.exercise.born).isSame(values.answer[key].born.format('YYYY-MM-DD'));
                if (Number(setting.mode) === 3)
                    result = result && moment(total.exercise.die).isSame(values.answer[key].die.format('YYYY-MM-DD'));
            }
            return {...total, user, result};
        });

        return {
            totals: _totals,
            status: 'result',
            stats: {all: setting.count, success: _totals.filter((val: any) => val.result).length},
        };
    };

    return <AnswerLayout
        cols={{span: 24}}
        checkHandler={checkHandler}
    >
        <InputsWrapper>
            {
                totals.map((total: any, key: number) =>
                    <InputAnswer total={total} key={key} totalKey={key}/>)
            }
        </InputsWrapper>
    </AnswerLayout>
};

export default Answer;