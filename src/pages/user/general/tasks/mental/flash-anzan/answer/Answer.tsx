import React, {useCallback} from 'react';
import {useSelector} from "react-redux";
import AnswerLayout from "../../../layouts/answer/Answer.layout";
import FormInputAnswerLayout from "../../../layouts/answer/form-input-answer/FormInputAnswer.layout";
import {gameSelector} from "../../../../../../../store/common/game/gameSplice";

const Answer: React.FC = () => {
    const {totals} = useSelector(gameSelector);

    const onFinishSubmit = useCallback((values: any, success= 0) => {
        let createTotals = totals.map((total: any, key: number) => {
            let result = total.answer === Number(values.answer[key]);
            result && success++;

            return {...total, ...{user: Number(values.answer[key]), result}};
        });
        return {status: 'result', success, totals: createTotals};
    }, [totals]);

    return <AnswerLayout cols={{xl: 10, md: 12, sm: 14, xs: 24}} checkHandler={onFinishSubmit}>
        {totals.map((total: any, key: any) =>
            <FormInputAnswerLayout
                key={key} group={key + 1}
                type="number" autoFocus={0} index={key}
            />
        )}
    </AnswerLayout>;
};

export default Answer;
