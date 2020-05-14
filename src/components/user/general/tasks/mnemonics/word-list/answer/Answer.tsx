import React from 'react';
import {useSelector} from "react-redux";
import FormInputAnswerLayout from "../../../layouts/answer/form-input-answer/FormInputAnswer.layout";
import AnswerLayout from "../../../layouts/answer/Answer.layout";
import {totalsSelect} from "../../../../../../../store/tasks/totals/reducer";

interface AnswerProps {
}

const Answer: React.FC<AnswerProps> = () => {
    const totals = useSelector(totalsSelect);

    const checkHandler = (values: any) => {
        let _totals = Object.values(totals).map((total: any, key: number) => ({
            ...total,
            user: values.answer[key],
            result: String(total.exercise.word)
                .replace(/ё/g, "е")
                .toLowerCase() === String(values.answer[key])
                .replace(/ё/g, "е")
                .toLowerCase()
        }));

        return {
            totals: _totals,
            status: 'result',
            stats: {all: _totals.length, success: _totals.filter((val: any) => val.result).length},
        };
    };

    return (
        <AnswerLayout cols={{xl: 10, md: 12, xs: 24}} checkHandler={checkHandler}>
            {
                Object.values(totals).map((total: any, key: any) =>
                    <FormInputAnswerLayout group={key + 1} index={key} autoFocus={0} key={key}/>
                )
            }
        </AnswerLayout>
    );
};

export default Answer;