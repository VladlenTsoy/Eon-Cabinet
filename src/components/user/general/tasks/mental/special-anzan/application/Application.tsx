import React, {useCallback} from 'react';
import {useSelector} from "react-redux";
import {random} from 'lodash';
import {useUpdateOutputEffect} from "../../../layouts/application/use-update-output.effect";
import ApplicationLayout from "../../../layouts/application/Application.layout";
import {gameSelector} from "../../../../../../../store/reducers/common/game/gameSplice";

const Application: React.FC = () => {
    const {totals, setting} = useSelector(gameSelector);

    const [updateExercises] = useUpdateOutputEffect({extra: setting.extra});

    const updateAnswersTotals = useCallback((data, currentTimes) => {
        let numbers = [];
        for (let i = 0; i < setting.count; i++) {
            numbers.push(random(setting.from, setting.to));
        }
        totals[currentTimes] = {
            exercise: numbers,
            answer: numbers.reduce((total: any, val: any) => total + val)
        };
        return totals
    }, [totals, setting]);

    const updateStats = useCallback(() => {
        return {all: setting.count};
    }, [setting]);

    const createOutputs = useCallback((totals, currentTimes) => {
        return updateExercises(totals[currentTimes].exercise);
    }, [updateExercises]);

    return <ApplicationLayout
        createOutputs={createOutputs}
        displayType="basic"
        setting={setting}
        updateAnswersTotals={updateAnswersTotals}
        updateStats={updateStats}
        pictures="abacus"
    />
};

export default Application;