import React from 'react';
import AnswerLayout from "../../../layouts/answer/Answer.layout";
import FormInputAnswerLayout from "../../../layouts/answer/form-input-answer/FormInputAnswer.layout";
import {useSelector} from "react-redux";
import {totalsSelect} from "../../../../../../../store/reducers/common/tasks/totals/reducer";
import {gameSelector} from "../../../../../../../store/reducers/common/game/gameSplice";

interface AnswerProps {
}

const Answer: React.FC<AnswerProps> = () => {
    const {currentTimes} = useSelector(gameSelector);
    const totals:any = useSelector(totalsSelect);

    /**
     *
     *
     * @param values
     */
    const checkHandler = (values: any) => {
        let success = 0;
        totals[currentTimes].user = values.answer.replace(/\s/g, '');
        totals[currentTimes].result = totals[currentTimes].exercise === totals[currentTimes].user;

        totals[currentTimes].exercise.split('')
            .map((val: any, key: number) => {
                if (totals[currentTimes].user[key] === val) success++;
                return success;
            });

        return {
            totals: totals,
            stats: {success},
            status: 'result',
        };
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