import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import { ArrowRightOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Typography } from "antd";
import {gameChangeStats, gameChangeStatus, gameChangeTotals} from "../../../../../../../store/game/actions";
import FormInputAnswerLayout from "../../../layouts/answer/form-input-answer/FormInputAnswer.layout";
import AnswerLayout from "../../../layouts/answer/Answer.layout";

const {Title} = Typography;

interface AnswerProps {
    form: any;
}

const Answer: React.FC<AnswerProps> = ({form}) => {
    const {game} = useSelector((state: any) => state);
    const {totals} = game;
    const dispatch = useDispatch();

    const checkHandler = (values: any) => {
        let _totals = totals.map((total: any, key: number) => ({
            ...total,
            user: values.answer[key],
            result: String(total.exercise.word)
                .replace(/ё/g,"е")
                .toLowerCase() === String(values.answer[key])
                .replace(/ё/g,"е")
                .toLowerCase()
        }));
        dispatch(gameChangeTotals(_totals));
        dispatch(gameChangeStats({all: totals.length, success: _totals.filter((val: any) => val.result).length}));
        dispatch(gameChangeStatus('result'));
    };

    return (
        <AnswerLayout form={form} cols={{xl: 10, md: 12, xs: 24}} checkHandler={checkHandler}>
            <Title level={2}>Введите ответы</Title>
            {
                totals.map((total: any, key: any) =>
                    <FormInputAnswerLayout group form={form} answerKey={key} key={key}/>
                )
            }
            <Button type="primary" htmlType="submit" block size="large" icon={<ArrowRightOutlined />}>
                Далее
            </Button>
        </AnswerLayout>
    );
};

export default Form.create()(Answer);