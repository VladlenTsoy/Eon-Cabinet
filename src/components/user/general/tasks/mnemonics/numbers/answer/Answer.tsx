import React from 'react';
import {useSelector} from "react-redux";
import AnswerLayout from "../../../layouts/answer/Answer.layout";
import FormInputAnswerLayout from "../../../layouts/answer/form-input-answer/FormInputAnswer.layout";
import {totalsSelect} from "../../../../../../../store/tasks/totals/reducer";

const Answer: React.FC = () => {
    const totals:any = useSelector(totalsSelect);

    const checkHandler = (values: any) => {
        let _totals = totals.map((total: any, key: number) => ({
            ...total,
            user: Number(values.answer[key]),
            result: Number(total.exercise) === Number(values.answer[key])
        }));

        return {
            status: 'result',
            totals: _totals,
            stats: {success: _totals.filter((val: any) => val.result).length},
        };
    };

    return <AnswerLayout cols={{xl: 10, md: 12, xs: 24}} checkHandler={checkHandler}>
        {
            totals.map((total: any, key: number) =>
                <FormInputAnswerLayout group={key + 1} index={key} autoFocus={0} key={key}/>
            )
        }
    </AnswerLayout>
};

export default Answer;