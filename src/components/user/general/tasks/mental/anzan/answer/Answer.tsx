import React from 'react';
import {useSelector} from "react-redux";
import Double from "./double-answer/Double";
import Basic from "./basic-answer/Basic";
import AnswerLayout from "../../../layouts/answer/Answer.layout";
import {Button, Typography} from "antd";
import {ArrowRightOutlined} from '@ant-design/icons';

const {Title} = Typography;

const Answer: React.FC = () => {
    const {game} = useSelector((state: any) => state);
    const {setting, totals, stats, currentTimes} = game;

    const isDouble = setting.anzan === 'double';
    const isGroup = setting.extra && setting.extra.includes('group');

    const cols = isDouble ?
        {xl: 12, md: 14, sm: 16, xs: 24} :
        {xl: 10, md: 12, sm: 14, xs: 24};

    const checkAnswerGroup = (values: any) => {
        let _totals = isDouble ?
            totals.map((total: any, key: number) => {
                let result1 = total[0].answer === Number(values.answer1[key]);
                let result2 = total[0].answer === Number(values.answer2[key]);

                result1 && stats.success++;
                result2 && stats.success++;

                return [
                    {...total[0], ...{user: Number(values.answer1[key]), result: result1}},
                    {...total[1], ...{user: Number(values.answer2[key]), result: result2}}
                ];
            }) :
            totals.map((total: any, key: number) => {
                let result = total.answer === Number(values.answer[key]);
                result && stats.success++;

                return {...total, ...{user: Number(values.answer[key]), result}};
            });

        return {totals: _totals, status: 'result', stats}
    };

    const checkAnswer = (values: any) => {
        if (isDouble) {
            let result1 = totals[currentTimes][0].answer === Number(values.answer1);
            let result2 = totals[currentTimes][1].answer === Number(values.answer2);
            result1 && stats.success++;
            result2 && stats.success++;

            totals[currentTimes] = [
                {...totals[currentTimes][0], ...{user: Number(values.answer1), result: result1}},
                {...totals[currentTimes][1], ...{user: Number(values.answer2), result: result2}},
            ];
        } else {
            let result = totals[currentTimes].answer === Number(values.answer);
            result && stats.success++;
            totals[currentTimes] = {
                ...totals[currentTimes], ...{user: Number(values.answer), result: result}
            };
        }
        return {totals, status: 'intermediate', stats}
    };

    const handleSubmit = (values: any): any => isGroup ?
        checkAnswerGroup(values) :
        checkAnswer(values);

    return <AnswerLayout
        cols={cols}
        checkHandler={handleSubmit}
    >
        <Title level={2}>Введите ответ</Title>
        {isDouble ? <Double/> : <Basic/>}
        <Button type="primary" htmlType="submit" block size="large" icon={<ArrowRightOutlined/>}>
            Далее
        </Button>
    </AnswerLayout>;
};

export default Answer;
