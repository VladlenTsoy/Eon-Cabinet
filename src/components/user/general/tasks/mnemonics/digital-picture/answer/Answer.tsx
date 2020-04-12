import React from 'react';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button } from "antd";
import {useDispatch, useSelector} from "react-redux";
import {gameChangeStats, gameChangeStatus, gameChangeTotals} from "../../../../../../../store/game/actions";
import AnswerLayout from "../../../layouts/answer/Answer.layout";
import InputAnswer from "./input-answer/InputAnswer";
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


const Answer: React.FC<AnswerProps> = () => {
    const {game} = useSelector((state: any) => state);
    const {totals, setting} = game;
    const dispatch = useDispatch();

    const checkHandler = (values: any) => {
        let _totals = totals.map((total: any, key: number) => {
            let user = values.answer[key];
            let result = Number(total.exercise.number) === Number(values.answer[key].number);

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

export default Form.create()(Answer);