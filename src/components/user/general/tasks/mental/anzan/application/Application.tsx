import React, {useCallback, useState} from 'react';
import {useSelector} from "react-redux";
import ApplicationLayout from "../../../layouts/application/Application.layout";
import {settingAnzan} from "../../../../../../../store/tasks/setting/reducer";

const Application: React.FC = () => {
    const setting = useSelector(settingAnzan);
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

    const updateTotals = useCallback((data, totals, currentTimes) => {
        if (setting.anzan === 'list') {
            data.map((exercises: any, key: number) => {
                exercises = setting.extra && setting.extra.includes('mirror') ? updateMirror(exercises) : exercises;
                totals[key] = {
                    exercises: exercises,
                    output: addOutputToTotals(exercises),
                    answer: addAnswerToTotals(exercises),
                }
            });
        } else {
            const exercises = setting.extra && setting.extra.includes('mirror') ? updateMirror(data) : data;
            totals[currentTimes] = {
                exercises: exercises,
                output: addOutputToTotals(exercises),
                answer: addAnswerToTotals(exercises),
            };
        }
        return totals;
    }, [isMultiplication, addAnswerToTotals]);

    const updateStats = useCallback(() => {
        if (setting.anzan === 'list')
            return {all: (isMultiplication ? setting.tables * setting.column * setting.rows : setting.tables * setting.column)};
        else
            return {all: setting.times};
    }, []);

    return <ApplicationLayout
        timer={setting.anzan === 'list'}
        setting={setting}
        updateTotals={updateTotals}
        updateStats={updateStats}
        displayType={setting.anzan}
        urlExercises={setting.anzan === 'list' ? '/algorithm/list' : setting.anzan === 'double' ? '/algorithm/double' : '/algorithm'}
        pictures="abacus"
        nextStatus={setting.extra.includes('group') ? "intermediate" : "answer"}
    />
};

export default Application;