import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import ApplicationLayout from "../../../layouts/application/Application.layout";
import {chunk, flattenDepth} from "lodash";
import {
    changeStats,
    changeStatus,
    changeTotals, gameSubSelector
} from "../../../../../../../store/common/game/gameSplice";
import {useUpdateOutputEffect} from "../../../layouts/application/application-output/use-update-output.effect";
import TbodyAddition from "./list/tbody-addition/TbodyAddition";
import TbodyMultiplication from "./list/tbody-multiplication/TbodyMultiplication";

interface ApplicationProps {
    otherUrl?: string;
}

const Application: React.FC<ApplicationProps> = ({otherUrl}) => {
    const dispatch = useDispatch();
    const setting = useSelector(gameSubSelector('setting'));
    const totals = useSelector(gameSubSelector('totals'));
    const [isMultiplication] = useState(setting.mode === 'divide' || setting.mode === 'multiply');

    // Update exercise mirror
    const [updateExercises, updateMirror] = useUpdateOutputEffect({extra: setting.extra});

    /**
     * Создание Totals
     */
    const createTotals = useCallback((data) => {
        if (setting.anzan === 'double')
            return data.map((exercises: any[]) => {
                return exercises.map((exercise: number[]) => {
                    exercise = setting?.extra.includes('mirror') ? updateMirror(exercise) : exercise;
                    return {
                        exercise,
                        answer: isMultiplication ?
                            setting.mode === 'multiply' ? exercise[0] * exercise[1] : exercise[0] / exercise[1] :
                            exercise.reduce((acc, val) => acc + val)
                    }
                })
            });
        else
            return data.map((exercise: number[]) => {
                exercise = setting?.extra.includes('mirror') ? updateMirror(exercise) : exercise;
                return {
                    exercise,
                    answer: isMultiplication ?
                        setting.mode === 'multiply' ? exercise[0] * exercise[1] : exercise[0] / exercise[1] :
                        exercise.reduce((acc, val) => acc + val)
                }
            })
    }, [isMultiplication, setting, updateMirror]);

    /**
     *
     */
    const updateResultsTotals = useCallback((answers: any) => {
        let success = 0;
        const flattenAnswers = flattenDepth(answers, 2);

        const createdTotals = totals.map((total: any, key: number) => {
            if (Number(total.answer) === Number(flattenAnswers[key]))
                success++;

            return {
                ...total,
                result: Number(total.answer) === Number(flattenAnswers[key]),
                user: flattenAnswers[key]
            };
        });

        dispatch(changeTotals(createdTotals));
        dispatch(changeStats({success}));
        dispatch(changeStatus('result'));
    }, [dispatch, totals]);

    /**
     *
     */
    const updateStats = useCallback(() => {
        if (setting?.custom_exercises_id && setting?.type_task === 'list')
            return {all: setting.tables * setting.column * setting.rows};
        else if (setting.anzan === 'list')
            return {all: isMultiplication ? setting.tables * setting.column * setting.rows : setting.tables * setting.column};
        else
            return {all: setting.times};
    }, [setting, isMultiplication]);

    // Обновление вывода цифр
    const addOutputToTotals = useCallback((exercise) =>
            isMultiplication ?
                [exercise[0] + (setting.mode === 'multiply' ? ' * ' : ' / ') + exercise[1]] :
                updateExercises(exercise),
        [isMultiplication, setting, updateExercises]);

    // Создание отоюражения цифр
    const createOutputs = useCallback((totals, currentTimes) => {

        // Для листов
        if (setting.anzan === 'list') {
            let outputs = Object.values(totals).map((total: any) => addOutputToTotals(total.exercise));
            return isMultiplication ?
                chunk(chunk(outputs, setting.column), setting.rows) :
                chunk(outputs, setting.column);
        }

        // Для Двойной
        else if (setting.anzan === 'double')
            return [addOutputToTotals(totals[currentTimes][0].exercise), addOutputToTotals(totals[currentTimes][1].exercise)];

        // Для Обычный и Турбо
        return addOutputToTotals(totals[currentTimes].exercise);
    }, [isMultiplication, addOutputToTotals, setting]);

    const [listSetting] = useState({
        column: setting.column,
        leftNumbering: false,
        layout: isMultiplication ? TbodyMultiplication : TbodyAddition
    });

    // console.log('anzan')

    return <ApplicationLayout
        createOutputs={createOutputs}
        updateAnswersTotals={createTotals}
        updateStats={updateStats}
        requestSetting={{
            url: otherUrl ? otherUrl :
                setting.anzan === 'list' ? '/algorithm/list' : setting.anzan === 'double' ? '/algorithm/double' : '/algorithm'
        }}
        pictures="abacus"
        listSetting={listSetting} updateResultsTotals={updateResultsTotals}
        timer={setting.anzan === 'list'} nextStatus={setting.anzan === 'list' ? 'result' :
        setting.extra.includes('group') ? "intermediate" : "answer"} displayType={setting.anzan}
    />
};

export default React.memo(Application);