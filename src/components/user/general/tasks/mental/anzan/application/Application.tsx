import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import ApplicationLayout from "../../../layouts/application/Application.layout";
import {settingAnzan} from "../../../../../../../store/reducers/common/tasks/setting/reducer";
import {totalsSelect} from "../../../../../../../store/reducers/common/tasks/totals/reducer";
import {chunk, flattenDepth} from "lodash";
import {totalsChange} from "../../../../../../../store/reducers/common/tasks/totals/action";
import {changeStats, changeStatus} from "../../../../../../../store/reducers/common/game/gameSplice";
import {useUpdateOutputEffect} from "../../../layouts/application/use-update-output.effect";
import TbodyAddition from "./list/tbody-addition/TbodyAddition";
import TbodyMultiplication from "./list/tbody-multiplication/TbodyMultiplication";

interface ApplicationProps {
    otherUrl?: string;
}

const Application: React.FC<ApplicationProps> = ({otherUrl}) => {
    const dispatch = useDispatch();
    const setting = useSelector(settingAnzan);
    const totals = useSelector(totalsSelect);
    const [isMultiplication] = useState(setting.mode === 'divide' || setting.mode === 'multiply');

    // Update exercise mirror
    const [updateExercises, updateMirror] = useUpdateOutputEffect({extra: setting.extra});

    const addAnswerToTotals = useCallback((exercises) => {
        // Count the answer
        if (isMultiplication)
            return setting.mode === 'multiply' ? exercises[0] * exercises[1] : exercises[0] / exercises[1];
        else
            return exercises.reduce((total: any, val: any) => total + val);
    }, [isMultiplication, setting]);

    const addOutputToTotals = useCallback((exercise) => {
        if (isMultiplication)
            return [exercise[0] + (setting.mode === 'multiply' ? ' * ' : ' / ') + exercise[1]];
        return updateExercises(exercise);
    }, [isMultiplication, setting, updateExercises]);

    const updateAnswersTotals = useCallback((data, currentTimes) => {
        if (setting.anzan === 'list') {
            data.map((exercises: any, key: number) => {
                exercises = setting.extra && setting.extra.includes('mirror') ? updateMirror(exercises) : exercises;
                return totals[key] = {
                    exercise: exercises,
                    answer: addAnswerToTotals(exercises),
                }
            });
        } else if (setting.anzan === 'double') {
            totals[currentTimes] = data.map((exercises: any) => {
                exercises = setting.extra && setting.extra.includes('mirror') ? updateMirror(exercises) : exercises;
                return {
                    exercise: exercises,
                    answer: addAnswerToTotals(exercises),
                };
            });
        } else {
            const exercises = setting.extra && setting.extra.includes('mirror') ? updateMirror(data) : data;
            totals[currentTimes] = {
                exercise: exercises,
                answer: addAnswerToTotals(exercises),
            };
        }
        return totals;
    }, [addAnswerToTotals, totals, setting, updateMirror]);

    const updateResultsTotals = useCallback((answers: any) => {
        let success = 0;
        let flattenAnswers = flattenDepth(answers, 2);

        const _totals = Object.values(totals).map((total: any, key: number) => {
            if (Number(total.answer) === Number(flattenAnswers[key]))
                success++;

            return {
                ...total,
                result: Number(total.answer) === Number(flattenAnswers[key]),
                user: flattenAnswers[key]
            };
        });

        dispatch(totalsChange(_totals));
        dispatch(changeStats({success}));
        dispatch(changeStatus('result'));
    }, [dispatch, totals]);

    const updateStats = useCallback(() => {
        if (setting.anzan === 'list')
            return {all: (isMultiplication ? setting.tables * setting.column * setting.rows : setting.tables * setting.column)};
        else
            return {all: setting.times};
    }, [setting, isMultiplication]);

    const createOutputs = useCallback((totals, currentTimes) => {
        if (setting.anzan === 'list') {
            let outputs = Object.values(totals).map((total: any) => addOutputToTotals(total.exercise));
            return isMultiplication ?
                chunk(chunk(outputs, setting.column), setting.rows) :
                chunk(outputs, setting.column);
        } else if (setting.anzan === 'double') {
            return [addOutputToTotals(totals[currentTimes][0].exercise), addOutputToTotals(totals[currentTimes][1].exercise)];
        } else {
            return addOutputToTotals(totals[currentTimes].exercise);
        }
    }, [isMultiplication, addOutputToTotals, setting]);

    return <ApplicationLayout
        {
            ...setting.anzan === 'list' &&
            {
                listSetting: {
                    column: setting.column,
                    leftNumbering: false,
                    layout: isMultiplication ? TbodyMultiplication : TbodyAddition
                }
            }
        }
        createOutputs={createOutputs}
        timer={setting.anzan === 'list'}
        setting={setting}
        updateAnswersTotals={updateAnswersTotals}
        updateResultsTotals={updateResultsTotals}
        updateStats={updateStats}
        displayType={setting.anzan}
        requestSetting={{
            url: otherUrl ? otherUrl :
                setting.anzan === 'list' ? '/algorithm/list' : setting.anzan === 'double' ? '/algorithm/double' : '/algorithm'
        }}
        pictures="abacus"
        nextStatus={
            setting.anzan === 'list' ? 'result' :
                setting.extra.includes('group') ? "intermediate" : "answer"}
    />
};

export default Application;