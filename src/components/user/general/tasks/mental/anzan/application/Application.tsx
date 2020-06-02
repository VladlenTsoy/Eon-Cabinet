import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import ApplicationLayout from "../../../layouts/application/Application.layout";
import {chunk, flattenDepth} from "lodash";
import {
    changeStats,
    changeStatus,
    gameSelector,
    changeTotals
} from "../../../../../../../store/reducers/common/game/gameSplice";
import {useUpdateOutputEffect} from "../../../layouts/application/use-update-output.effect";
import TbodyAddition from "./list/tbody-addition/TbodyAddition";
import TbodyMultiplication from "./list/tbody-multiplication/TbodyMultiplication";

interface ApplicationProps {
    otherUrl?: string;
}

const Application: React.FC<ApplicationProps> = ({otherUrl}) => {
    const dispatch = useDispatch();
    const {setting, totals} = useSelector(gameSelector);
    const [isMultiplication] = useState(setting.mode === 'divide' || setting.mode === 'multiply');

    // Update exercise mirror
    const [updateExercises, updateMirror] = useUpdateOutputEffect({extra: setting.extra});

    /**
     * Добавление ответа в Total
     */
    const addAnswerToTotal = useCallback((exercise: number[]) =>
            isMultiplication ?
                setting.mode === 'multiply' ? exercise[0] * exercise[1] : exercise[0] / exercise[1] :
                exercise.reduce((acc, val) => acc + val),
        [isMultiplication, setting]);

    /**
     * Создание Total и добавление ответов
     */
    const createTotal = useCallback((exercise) => {
        exercise = setting?.extra.includes('mirror') ? updateMirror(exercise) : exercise;
        return {
            exercise,
            answer: addAnswerToTotal(exercise)
        }
    }, [setting, updateMirror, addAnswerToTotal]);

    /**
     * Создание Totals
     */
    const createTotals = useCallback((data) => {
        console.log(data)
            return data.map((exercise: any) => createTotal(exercise));
        }, [createTotal]);

    /**
     *
     */
    const updateResultsTotals = useCallback((answers: any) => {
        let success = 0;
        const flattenAnswers = flattenDepth(answers, 2);

        const _totals = totals.map((total: any, key: number) => {
            if (Number(total.answer) === Number(flattenAnswers[key]))
                success++;

            return {
                ...total,
                result: Number(total.answer) === Number(flattenAnswers[key]),
                user: flattenAnswers[key]
            };
        });

        dispatch(changeTotals(_totals));
        dispatch(changeStats({success}));
        dispatch(changeStatus('result'));
    }, [dispatch, totals]);

    /**
     *
     */
    const updateStats = useCallback(() => {
        if (setting.anzan === 'list')
            return {all: isMultiplication ? setting.tables * setting.column * setting.rows : setting.tables * setting.column};
        else
            return {all: setting.times};
    }, [setting, isMultiplication]);

    /**
     *
     */
    const addOutputToTotals = useCallback((exercise) =>
            isMultiplication ?
                [exercise[0] + (setting.mode === 'multiply' ? ' * ' : ' / ') + exercise[1]] :
                updateExercises(exercise),
        [isMultiplication, setting, updateExercises]);

    /**
     *
     */
    const createOutputs = useCallback((totals, currentTimes) => {
        if (setting.anzan === 'list') {
            let outputs = Object.values(totals).map((total: any) => addOutputToTotals(total.exercise));
            return isMultiplication ?
                chunk(chunk(outputs, setting.column), setting.rows) :
                chunk(outputs, setting.column);
        } else if (setting.anzan === 'double') {
            return [addOutputToTotals(totals[0].exercise), addOutputToTotals(totals[1].exercise)];
        }

        console.log(totals)
        // basic
        return totals[currentTimes].exercise;
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
        updateAnswersTotals={createTotals}
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

export default React.memo(Application);