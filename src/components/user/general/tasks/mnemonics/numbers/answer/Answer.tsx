import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {gameChangeStats, gameChangeStatus, gameChangeTotals} from "../../../../../../../store/game/actions";
import AnswerLayout from "../../../layouts/answer/Answer.layout";
import FormInputAnswerLayout from "../../../layouts/answer/form-input-answer/FormInputAnswer.layout";
import { ArrowRightOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Typography } from "antd";

const {Title} = Typography;

interface AnswerProps {
}

const Answer: React.FC<AnswerProps> = () => {
    const {game} = useSelector((state: any) => state);
    const {totals} = game;
    const dispatch = useDispatch();

    const checkHandler = (values: any) => {
        let _totals = totals.map((total: any, key: number) => ({
            ...total,
            user: Number(values.answer[key]),
            result: Number(total.exercise) === Number(values.answer[key])
        }));
        dispatch(gameChangeTotals(_totals));
        dispatch(gameChangeStats({success: _totals.filter((val: any) => val.result).length}));
        dispatch(gameChangeStatus('result'));
    };

    return (
        <AnswerLayout cols={{xl: 10, md: 12, xs: 24}} checkHandler={checkHandler}>
            <Title level={2}>Введите ответы</Title>
            {
                totals.map((total: any, key: any) =>
                    <FormInputAnswerLayout group answerKey={key} key={key}/>
                )
            }
            <Button type="primary" htmlType="submit" block size="large" icon={<ArrowRightOutlined />}>
                Далее
            </Button>
        </AnswerLayout>
    );
};

export default Form.create()(Answer);