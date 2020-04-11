import React from 'react';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button } from 'antd';
import AnswerLayout from "../../../layouts/answer/Answer.layout";
import {gameChangeStats, gameChangeStatus, gameChangeTotals} from "../../../../../../../store/game/actions";
import {useDispatch, useSelector} from "react-redux";
import InputAnswer from "./input-answer/InputAnswer";
import styled from "styled-components";
import moment from "moment";

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
    form: any;
}

const Answer: React.FC<AnswerProps> = ({form}) => {
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
            let result = namePreparation(total.exercise.full_name) === namePreparation(values.answer[key].full_name);

            if (Number(setting.mode) > 1) {
                result = result && moment(total.exercise.born).isSame(values.answer[key].born.format('YYYY-MM-DD'));
                if (Number(setting.mode) === 3)
                    result = result && moment(total.exercise.die).isSame(values.answer[key].die.format('YYYY-MM-DD'));
            }
            return {...total, user, result};
        });

        dispatch(gameChangeTotals(_totals));
        dispatch(gameChangeStats({all: setting.count, success: _totals.filter((val: any) => val.result).length}));
        dispatch(gameChangeStatus('result'));
    };

    return (
        <AnswerLayout
            form={form}
            cols={{span: 24}}
            checkHandler={checkHandler}
        >
            <InputsWrapper>
                {totals.map((total: any, key: number) =>
                    <InputAnswer total={total} form={form} key={key} totalKey={key}/>)
                }
            </InputsWrapper>
            <Button type="primary" htmlType="submit" block size="large" icon={<ArrowRightOutlined />}>
                Далее
            </Button>
        </AnswerLayout>
    );
};

export default Form.create()(Answer);