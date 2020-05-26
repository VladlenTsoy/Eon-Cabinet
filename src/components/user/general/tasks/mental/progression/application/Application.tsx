import React, {useCallback} from "react";
import {useSelector} from "react-redux";
import ApplicationLayout from "../../../layouts/application/Application.layout";
import {settingAnzan} from "../../../../../../../store/reducers/common/tasks/setting/reducer";
import {totalsSelect} from "../../../../../../../store/reducers/common/tasks/totals/reducer";
import {useUpdateOutputEffect} from "../../../layouts/application/use-update-output.effect";

const Application: React.FC = () => {
    let setting = useSelector(settingAnzan);
    const totals = useSelector(totalsSelect);

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
