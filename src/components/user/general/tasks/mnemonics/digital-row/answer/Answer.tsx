import React from 'react';
import AnswerLayout from "../../../layouts/answer/Answer.layout";
import FormInputAnswerLayout from "../../../layouts/answer/form-input-answer/FormInputAnswer.layout";
import {useSelector} from "react-redux";
import {gameSelector} from "../../../../../../../store/reducers/common/game/gameSplice";

interface AnswerProps {
}

const Answer: React.FC<AnswerProps> = () => {
    const {currentTimes, totals} = useSelector(gameSelector);

    /**
     *
     *
     * @param values
     * @param success
     */
    const checkHandler = (values: any, success = 0) => {
        const user = values.answer.replace(/\s/g, '');
        const createTotal = {user, result: totals[currentTimes].exercise === user}

        totals[currentTimes].exercise.split('')
            .map((val: any, key: number) => user[key] === val && success++);

        return {total: createTotal, success, status: 'result',};
    };

    return (
        <AnswerLayout
            cols={{xl: 10, md: 12, xs: 24}}
            checkHandler={checkHandler}
        >
            <FormInputAnswerLayout index={0} autoFocus={0}/>
        </AnswerLayout>
    );
};

export default Answer;