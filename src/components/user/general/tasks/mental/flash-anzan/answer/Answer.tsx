import React, {useCallback} from 'react';
import {useSelector} from "react-redux";
import AnswerLayout from "../../../layouts/answer/Answer.layout";
import FormInputAnswerLayout from "../../../layouts/answer/form-input-answer/FormInputAnswer.layout";
import {totalsSelect} from "../../../../../../../store/reducers/common/tasks/totals/reducer";
import {game} from "../../../../../../../store/reducers/common/game/reducer";

const Answer: React.FC = () => {
    const {stats} = useSelector(game);
    const totals: any = useSelector(totalsSelect);

    const onFinishSubmit = useCallback((values: any) => {
        let _totals = totals.map((total: any, key: number) => {
            let result = total.answer === Number(values.answer[key]);
            result && stats.success++;

            return {...total, ...{user: Number(values.answer[key]), result}};
        });
        return {status: 'result', stats, totals: _totals};
    }, [totals, stats]);

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
