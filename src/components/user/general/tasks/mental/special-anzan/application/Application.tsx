import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {random} from 'lodash';
import {useUpdateOutputEffect} from "../../../layouts/application/application-output/use-update-output.effect";
import ApplicationLayout from "../../../layouts/application/Application.layout";
import {gameSubSelector, changeTotals} from "../../../../../../../store/reducers/common/game/gameSplice";

const Application: React.FC = () => {
    const setting = useSelector(gameSubSelector('setting'));
    const executionMode = useSelector(gameSubSelector('executionMode'));
    const dispatch = useDispatch();

    const [updateExercises] = useUpdateOutputEffect({extra: setting.extra});

    useEffect(() => {
        if (executionMode === 'fetch') {
            const createdTotals = [];
            for (let times = 0; times < setting.times; times++) {
                const numbers = Array(setting.count).fill(0).map(() => random(setting.from, setting.to));
                createdTotals[times] = {
                    exercise: numbers,
                    answer: numbers.reduce((total: any, val: any) => total + val, 0)
                };
            }
            dispatch(changeTotals(createdTotals));
        }
    }, [dispatch, executionMode, setting.count, setting.from, setting.times, setting.to]);

    const updateStats = useCallback(() => {
        return {all: setting.count};
    }, [setting]);

    const createOutputs = useCallback((totals, currentTimes) => {
        return updateExercises(totals[currentTimes].exercise);
    }, [updateExercises]);

    return <ApplicationLayout
        createOutputs={createOutputs}
        displayType="basic"
        updateStats={updateStats}
        pictures="abacus"
    />
};

export default Application;