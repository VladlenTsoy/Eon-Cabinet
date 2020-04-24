import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import ApplicationLayout from "../../../layouts/application/Application.layout";
import {settingAnzan} from "../../../../../../../store/tasks/setting/reducer";
import {totalsSelect} from "../../../../../../../store/tasks/totals/reducer";
import {flattenDepth} from "lodash";
import {totalsChange} from "../../../../../../../store/tasks/totals/action";
import {gameChangeStats, gameChangeStatus} from "../../../../../../../store/game/actions";

const Application: React.FC = () => {
    const dispatch = useDispatch();
    const setting = useSelector(settingAnzan);
    const totals = useSelector(totalsSelect);
    const [isMultiplication] = useState(setting.mode === 'divide' || setting.mode === 'multiply');

    // Update exercise mirror
    const updateMirror = useCallback((exercises: any) => {
        return exercises.map((int: any) => parseInt(`${int}${Math.abs(int)}`));
    }, []);

    const addAnswerToTotals = useCallback((exercises) => {
        // Count the answer
        if (isMultiplication)
            return setting.mode === 'multiply' ? exercises[0] * exercises[1] : exercises[0] / exercises[1];
        else
            return exercises.reduce((total: any, val: any) => total + val);
    }, [isMultiplication, setting]);

    const addOutputToTotals = useCallback((exercise) => {
        if (isMultiplication)
            return exercise[0] + (setting.mode === 'multiply' ? ' * ' : ' / ') + exercise[1];
        return exercise;
    }, [isMultiplication, setting]);

    const updateAnswersTotals = useCallback((data, currentTimes) => {
        if (setting.anzan === 'list') {
            data.map((exercises: any, key: number) => {
                exercises = setting.extra && setting.extra.includes('mirror') ? updateMirror(exercises) : exercises;
                totals[key] = {
                    exercise: exercises,
                    output: addOutputToTotals(exercises),
                    answer: addAnswerToTotals(exercises),
                }
            });
        } else if (setting.anzan === 'double') {
            totals[currentTimes] = data.map((exercises: any) => {
                exercises = setting.extra && setting.extra.includes('mirror') ? updateMirror(exercises) : exercises;
                return {
                    exercise: exercises,
                    output: addOutputToTotals(exercises),
                    answer: addAnswerToTotals(exercises),
                };
            });
        } else {
            const exercises = setting.extra && setting.extra.includes('mirror') ? updateMirror(data) : data;
            totals[currentTimes] = {
                exercise: exercises,
                output: addOutputToTotals(exercises),
                answer: addAnswerToTotals(exercises),
            };
        }
        return totals;
    }, [isMultiplication, addAnswerToTotals, totals]);

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
        dispatch(gameChangeStats({success}));
        dispatch(gameChangeStatus('result'));
    }, []);

    const updateStats = useCallback(() => {
        if (setting.anzan === 'list')
            return {all: (isMultiplication ? setting.tables * setting.column * setting.rows : setting.tables * setting.column)};
        else
            return {all: setting.times};
    }, []);

    return <ApplicationLayout
        timer={setting.anzan === 'list'}
        setting={setting}
        updateAnswersTotals={updateAnswersTotals}
        updateResultsTotals={updateResultsTotals}
        updateStats={updateStats}
        displayType={setting.anzan}
        urlExercises={setting.anzan === 'list' ? '/algorithm/list' : setting.anzan === 'double' ? '/algorithm/double' : '/algorithm'}
        pictures="abacus"
        nextStatus={setting.extra.includes('group') ? "intermediate" : "answer"}
    />
};

export default Application;