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

    const cols = isDouble ?
        {xl: 12, md: 14, sm: 16, xs: 24} :
        {xl: 10, md: 12, sm: 14, xs: 24};

    const checkAnswerGroup = (values: any, success = 0) => {
        let _totals = isDouble ?
            totals.map((total: any, key: number) => {
                let result1 = total[0].answer === Number(values.answer1[key]);
                let result2 = total[1].answer === Number(values.answer2[key]);

                result1 && result2 && success++;

                return [
                    {...total[0], ...{user: Number(values.answer1[key]), result: result1}},
                    {...total[1], ...{user: Number(values.answer2[key]), result: result2}}
                ];
            }) :
            totals.map((total: any, key: number) => {
                let result = total.answer === Number(values.answer[key]);
                result && success++;

                return {...total, ...{user: Number(values.answer[key]), result}};
            });

        return {totals: _totals, status: 'result', success}
    };

    const checkAnswer = (values: any, success = 0, total= {}) => {
        if (isDouble) {
            const result1 = totals[currentTimes][0].answer === Number(values.answer1);
            const result2 = totals[currentTimes][1].answer === Number(values.answer2);
            result1 && result2 && success++;

            total = [
                {user: Number(values.answer1), result: result1},
                {user: Number(values.answer2), result: result2},
            ];
        } else {
            const result = totals[currentTimes].answer === Number(values.answer);
            result && success++;

            total ={user: Number(values.answer), result: result};
        }

        return {status: 'intermediate', success, total}
    };

    const handleSubmit = (values: any): any => isGroup ?
        checkAnswerGroup(values) :
        checkAnswer(values);

    return <AnswerLayout
        cols={cols}
        checkHandler={handleSubmit}
    >
        {isDouble ? <Double/> : <Basic/>}
    </AnswerLayout>;
};

export default Answer;
