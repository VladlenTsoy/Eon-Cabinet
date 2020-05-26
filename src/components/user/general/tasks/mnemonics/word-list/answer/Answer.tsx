import React from 'react';
import {useSelector} from "react-redux";
import FormInputAnswerLayout from "../../../layouts/answer/form-input-answer/FormInputAnswer.layout";
import AnswerLayout from "../../../layouts/answer/Answer.layout";
import {totalsSelect} from "../../../../../../../store/reducers/common/tasks/totals/reducer";
import {settingAnzan} from "../../../../../../../store/reducers/common/tasks/setting/reducer";
import List from "./list/List";
import {flattenDepth} from "lodash";

const Answer: React.FC = () => {
    const totals = useSelector(totalsSelect);
    const setting = useSelector(settingAnzan);

    const checkHandler = (_values: any) => {
        const values = setting.mode === 'list' ? flattenDepth(_values.answer, 2) : _values.answer;
        const _totals = Object.values(totals).map((total: any, key: number) => ({
            ...total,
            user: values[key],
            result: String(total.exercise.word)
                .replace(/ё/g, "е")
                .toLowerCase() === String(values[key])
                .replace(/ё/g, "е")
                .toLowerCase()
        }));

        return {
            totals: _totals,
            status: 'result',
            stats: {all: _totals.length, success: _totals.filter((val: any) => val.result).length},
        };
    };

    return setting.mode === 'list' ?
        <List checkHandler={checkHandler}/> :
        <AnswerLayout cols={{xl: 10, md: 12, xs: 24}} checkHandler={checkHandler}>
            {
                Object.values(totals).map((total: any, key: any) =>
                    <FormInputAnswerLayout group={key + 1} index={key} autoFocus={0} key={key}/>
                )
            }
        </AnswerLayout>
};

export default Answer;