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

    let success = 0;

    /**
     *
     * @param total
     * @param user
     */
    const singleCheck = (total: { answer: number }, user: number) => {
        const result = total.answer === Number(user);
        result && success++;

        return {...total, user: Number(user), result: result};
    };

    /**
     *
     * @param total
     * @param users
     */
    const doubleCheck = (total: { answer: number }[], users: number[]) => {
        const result1 = total[0].answer === Number(users[0]);
        const result2 = total[1].answer === Number(users[1]);
        result1 && result2 && success++;

        return [
            {...total[0], user: Number(users[0]), result: result1},
            {...total[1], user: Number(users[1]), result: result2},
        ];
    };

    /**
     *
     * @param values
     */
    const checkAnswerGroup = (values: any) => {
        const createTotals = isDouble ?
            totals.map((total: any, key: number) => doubleCheck(total, [values.answer1[key], values.answer2[key]])) :
            totals.map((total: any, key: number) => singleCheck(total, values.answer[key]));

        return {totals: createTotals, status: 'result', success}
    };

    /**
     *
     * @param values
     */
    const checkAnswer = (values: any) => {
        const createTotal = isDouble ?
            doubleCheck(totals[currentTimes], [values.answer1, values.answer2]) :
            singleCheck(totals[currentTimes], values.answer);
        return {status: 'intermediate', success, total: createTotal}
    };

    return <AnswerLayout
        cols={
            isDouble ?
                {xxl: 10, xl: 12, md: 14, sm: 16, xs: 24} :
                {xxl: 8, xl: 10, md: 12, sm: 14, xs: 24}
        }
        checkHandler={isGroup ? checkAnswerGroup : checkAnswer}
    >
        {isDouble ? <Double/> : <Basic/>}
    </AnswerLayout>;
};

export default Answer;
