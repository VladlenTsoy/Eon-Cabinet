import React, {useCallback} from 'react';
import {useSelector} from "react-redux";
import {random} from 'lodash';
import {useUpdateOutputEffect} from "../../../layouts/application/application-output/use-update-output.effect";
import ApplicationLayout from "../../../layouts/application/Application.layout";
import {gameSubSelector} from "../../../../../../../store/common/game/gameSplice";

const Application: React.FC = () => {
    const setting = useSelector(gameSubSelector('setting'));

    const [updateExercises] = useUpdateOutputEffect({extra: setting.extra});

    const createTotals = useCallback(() => {
        const createdTotals = [];
        for (let times = 0; times < setting.times; times++) {
            const numbers = Array(setting.count).fill(0).map(() => random(setting.from, setting.to));
            createdTotals[times] = {
                exercise: numbers,
                answer: numbers.reduce((total: any, val: any) => total + val, 0)
            };
        }
        return createdTotals;
    }, [setting.count, setting.from, setting.times, setting.to]);

    const updateStats = useCallback(() => {
        return {all: setting.times};
    }, [setting]);

    const createOutputs = useCallback((totals, currentTimes) => {
        return updateExercises(totals[currentTimes].exercise);
    }, [updateExercises]);

    return <ApplicationLayout
        updateAnswersTotals={createTotals}
        createOutputs={createOutputs}
        displayType="basic"
        updateStats={updateStats}
        pictures="abacus"
    />
};

export default Application;