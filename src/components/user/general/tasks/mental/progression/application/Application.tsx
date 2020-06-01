import React, {useCallback} from "react";
import {useSelector} from "react-redux";
import ApplicationLayout from "../../../layouts/application/Application.layout";
import {useUpdateOutputEffect} from "../../../layouts/application/use-update-output.effect";
import {gameSelector} from "../../../../../../../store/reducers/common/game/gameSplice";

const Application: React.FC = () => {
    const {totals, setting} = useSelector(gameSelector);

    const [updateExercises] = useUpdateOutputEffect({extra: setting.extra});

    const updateAnswersTotals = useCallback((data, currentTimes) => {
        const numbers = [];
        for (let i = 1; i <= setting.count; i++) {
            numbers.push(i);
        }
        totals[currentTimes] = {
            exercise: numbers,
            answer: numbers.reduce((total: any, val: any) => total + val)
        };
        return totals
    }, [totals, setting]);

    const updateStats = useCallback(() => {
        return {all: 1};
    }, []);

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
