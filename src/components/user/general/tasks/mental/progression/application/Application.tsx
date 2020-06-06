import React, {useCallback} from "react";
import {useSelector} from "react-redux";
import ApplicationLayout from "../../../layouts/application/Application.layout";
import {useUpdateOutputEffect} from "../../../layouts/application/application-output/use-update-output.effect";
import {gameSelector} from "../../../../../../../store/reducers/common/game/gameSplice";

const Application: React.FC = () => {
    const {setting} = useSelector(gameSelector);

    const [updateExercises] = useUpdateOutputEffect({extra: setting.extra});

    const updateAnswersTotals = useCallback(() => {
        const numbers = [];
        for (let i = 1; i <= setting.count; i++) {
            numbers.push(i);
        }
        return [{
            exercise: numbers,
            answer: numbers.reduce((total: any, val: any) => total + val)
        }]
    }, [setting.count]);

    const updateStats = useCallback(() => {
        return {all: 1};
    }, []);

    const createOutputs = useCallback((totals, currentTimes) => {
        return updateExercises(totals[currentTimes].exercise);
    }, [updateExercises]);

    return <ApplicationLayout
        createOutputs={createOutputs}
        displayType="basic"
        updateAnswersTotals={updateAnswersTotals}
        updateStats={updateStats}
        pictures="abacus"
    />
};

export default Application;
