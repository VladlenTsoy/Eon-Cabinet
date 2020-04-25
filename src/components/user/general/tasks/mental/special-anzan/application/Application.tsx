import React, {useCallback} from 'react';
import {useSelector} from "react-redux";
import {random} from 'lodash';
import {settingAnzan} from "store/tasks/setting/reducer";
import {totalsSelect} from "store/tasks/totals/reducer";
import {useUpdateOutputEffect} from "../../../layouts/application/use-update-output.effect";
import ApplicationLayout from "../../../layouts/application/Application.layout";

const Application: React.FC = () => {
    let setting = useSelector(settingAnzan);
    const totals = useSelector(totalsSelect);

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
    }, [totals]);

    const updateStats = useCallback(() => {
        return {all: setting.count};
    }, []);

    const createOutputs = useCallback((totals, currentTimes) => {
        return updateExercises(totals[currentTimes].exercise);
    }, []);

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