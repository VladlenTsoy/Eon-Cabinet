import React from 'react';
import {useSelector} from "react-redux";
import AnswerLayout from "../../../layouts/answer/Answer.layout";
import FormInputAnswerLayout from "../../../layouts/answer/form-input-answer/FormInputAnswer.layout";
import {gameSelector} from "../../../../../../../store/common/game/gameSplice";

const Answer = () => {
    const {currentTimes, totals} = useSelector(gameSelector);

    const onFinishSubmit = (values: any, success = 0) => {
        let result = totals[currentTimes].answer === Number(values.answer);
        result && success++;
        const total = {user: Number(values.answer), result: result};
        return {status: 'result', success, total};
    };


    return <AnswerLayout cols={{xl: 10, md: 12, sm: 14, xs: 24}} checkHandler={onFinishSubmit}>
        <FormInputAnswerLayout index={1} autoFocus={1}/>
    </AnswerLayout>;
};

export default Answer;