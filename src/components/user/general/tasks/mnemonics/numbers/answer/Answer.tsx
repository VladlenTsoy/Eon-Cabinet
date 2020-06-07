import React from 'react';
import {useSelector} from "react-redux";
import AnswerLayout from "../../../layouts/answer/Answer.layout";
import FormInputAnswerLayout from "../../../layouts/answer/form-input-answer/FormInputAnswer.layout";
import List from "../../word-list/answer/list/List";
import {flattenDepth} from "lodash";
import {gameSelector} from "../../../../../../../store/reducers/common/game/gameSplice";

const Answer: React.FC = () => {
    const {setting, totals} = useSelector(gameSelector);

    const checkHandler = (_values: any) => {
        const values = setting['task-mode'] === 'list' ? flattenDepth(_values.answer, 2) : _values.answer;
        const createdTotals = totals.map((total: any, key: number) => ({
            ...total,
            user: Number(values[key]),
            result: Number(total.exercise) === Number(values[key])
        }));

        return {
            status: 'result',
            totals: createdTotals,
            success: createdTotals.filter((val: any) => val.result).length,
        };
    };

    return setting['task-mode'] === 'list' ?
        <List checkHandler={checkHandler}/> :
        <AnswerLayout cols={{xl: 10, md: 12, xs: 24}} checkHandler={checkHandler}>
            {
                totals.map((total: any, key: number) =>
                    <FormInputAnswerLayout type="number" group={key + 1} index={key} autoFocus={0} key={key}/>
                )
            }
        </AnswerLayout>
};

export default Answer;