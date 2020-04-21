import React from 'react';
import {useSelector} from "react-redux";
import AnswerLayout from "../../../layouts/answer/Answer.layout";
import FormInputAnswerLayout from "../../../layouts/answer/form-input-answer/FormInputAnswer.layout";
import {Button, Typography} from "antd";
import {ArrowRightOutlined} from '@ant-design/icons';

const {Title} = Typography;

const Answer = () => {
    const {game} = useSelector((state: any) => state);
    const {totals, stats, currentTimes} = game;

    const onFinishSubmit = (values: any) => {
        let result = totals[currentTimes].answer === Number(values.answer);
        result && stats.success++;
        totals[currentTimes] = {
            ...totals[currentTimes], ...{user: Number(values.answer), result: result}
        };
        return {status: 'result', stats, totals};
    };


    return <AnswerLayout cols={{xl: 10, md: 12, sm: 14, xs: 24}} checkHandler={onFinishSubmit}>
        <Title level={2}>Введите ответ</Title>
        <FormInputAnswerLayout index={1} autoFocus={1}/>
        <Button type="primary" htmlType="submit" size="large" block icon={<ArrowRightOutlined/>}>
            Далее
        </Button>
    </AnswerLayout>;
};

export default Answer;