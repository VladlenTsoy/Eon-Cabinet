import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {gameChangeStats, gameChangeStatus, gameChangeTotals} from "store/game/actions";
import AnswerLayout from "../../../layouts/answer/Answer.layout";
import InputAnswer from "./input-answer/InputAnswer";
import { ArrowRightOutlined } from '@ant-design/icons';
import { Button } from "antd";
import styled from "styled-components";

const InputsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
  margin-bottom: 1rem;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

interface AnswerProps {
}

const Answer:React.FC<AnswerProps> = () => {
    const {game} = useSelector((state: any) => state);
    const {totals, setting} = game;
    const dispatch = useDispatch();

    const namePreparation = (name: string): string => {
        return String(name)
            .toLowerCase()
            .replace(/ё/g, 'е')
            .replace(/\s+/g, '');
    };

    const checkHandler = (values: any) => {
        let _totals = totals.map((total: any, key: number) => {
            let user = values.answer[key];
            let result = namePreparation(total.exercise.country) === namePreparation(values.answer[key].country);

            if (Number(setting.mode) > 1) {
                result = result && namePreparation(total.exercise.capital) === namePreparation(values.answer[key].capital);
            }
            return {...total, user, result};
        });

        dispatch(gameChangeTotals(_totals));
        dispatch(gameChangeStats({all: setting.count, success: _totals.filter((val: any) => val.result).length}));
        dispatch(gameChangeStatus('result'));
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
            <Button type="primary" htmlType="submit" block size="large" icon={<ArrowRightOutlined />}>
                Далее
            </Button>
        </AnswerLayout>
    );
};

export default Answer;