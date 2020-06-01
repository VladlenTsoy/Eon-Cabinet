import React from 'react';
import {useSelector} from "react-redux";
import AnswerLayout from "../../../layouts/answer/Answer.layout";
import FormInputAnswerLayout from "../../../layouts/answer/form-input-answer/FormInputAnswer.layout";
import {gameSelector} from "../../../../../../../store/reducers/common/game/gameSplice";
import {totalsSelect} from "../../../../../../../store/reducers/common/tasks/totals/reducer";

const Answer = () => {
    const {stats, currentTimes} = useSelector(gameSelector);
    const totals = useSelector(totalsSelect);

    const onFinishSubmit = (values: any) => {
        let result = totals[currentTimes].answer === Number(values.answer);
        result && stats.success++;
        totals[currentTimes] = {
            ...totals[currentTimes], ...{user: Number(values.answer), result: result}
        };
        return {status: 'result', stats, totals};
    };


    return <AnswerLayout cols={{xl: 10, md: 12, sm: 14, xs: 24}} checkHandler={onFinishSubmit}>
        <FormInputAnswerLayout index={1} autoFocus={1}/>
    </AnswerLayout>;
};

export default Answer;