import React from 'react';
import {useSelector} from "react-redux";
import Double from "./double-answer/Double";
import Basic from "./basic-answer/Basic";
import AnswerLayout from "../../../layouts/answer/Answer.layout";
import {gameSelector} from "../../../../../../../store/reducers/common/game/gameSplice";

const Answer: React.FC = () => {
    const {currentTimes, setting, totals} = useSelector(gameSelector);
    const isDouble = setting.anzan === 'double';
    const isGroup = setting.extra && setting.extra.includes('group');

    const a = (answer: number, user: number, success: number) => {
        const result = answer === Number(user);
        result && success++;

        return {user: Number(user), result: result};
    };

    const b = (total: { answer: number }[], users: number[], success: number) => {
        const result1 = total[0].answer === Number(users[0]);
        const result2 = total[1].answer === Number(users[1]);
        result1 && result2 && success++;

        return [
            {...total[0], user: Number(users[0]), result: result1},
            {...total[1], user: Number(users[1]), result: result2},
        ];
    };

    const checkAnswerGroup = (values: any, success = 0) => {
        let _totals = isDouble ?
            totals.map((total: any, key: number) => b(total, [values.answer1[key], values.answer2[key]], success)) :
            totals.map((total: any, key: number) => ({...total, ...a(total.answer, values.answer[key], success)}));

        return {totals: _totals, status: 'result', success}
    };

    const checkAnswer = (values: any, success = 0, total = {}) => {
        total = isDouble ?
            b(totals[currentTimes], [values.answer1, values.answer2], success):
            a(totals[currentTimes].answer, values.answer, success);
        return {status: 'intermediate', success, total}
    };

    const handleSubmit = isGroup ? checkAnswerGroup : checkAnswer;

    return <AnswerLayout
        cols={
            isDouble ?
                {xl: 12, md: 14, sm: 16, xs: 24} :
                {xl: 10, md: 12, sm: 14, xs: 24}
        }
        checkHandler={handleSubmit}
    >
        {isDouble ? <Double/> : <Basic/>}
    </AnswerLayout>;
};

export default Answer;
