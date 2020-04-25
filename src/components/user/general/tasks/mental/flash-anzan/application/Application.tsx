import React, {useCallback, useEffect} from 'react';
import {random} from 'lodash';
import {useSelector} from "react-redux";
import ApplicationLayout from "../../../layouts/application/Application.layout";
import {settingAnzan} from "store/tasks/setting/reducer";
import {totalsSelect} from "store/tasks/totals/reducer";
import {useUpdateOutputEffect} from "../../../layouts/application/use-update-output.effect";

const Application: React.FC<any> = () => {
    let setting = useSelector(settingAnzan);
    const totals = useSelector(totalsSelect);

    const [, , updaterOutput] = useUpdateOutputEffect({extra: setting.extra});

    const updateAnswersTotals = useCallback(() => {
        for (let i = 0; i < setting.count; i++) {
            let number = random(setting.from, setting.to);
            totals[i] = {
                exercise: number,
                answer: number
            };
        }
        return totals
    }, [totals]);

    const updateStats = useCallback(() => {
        return {all: setting.count};
    }, []);

    const createOutputs = useCallback((totals) => {
        let outputs: any = [];
        Object.values(totals).map((total: any) => {
            outputs.push(updaterOutput(total.exercise))
        });
        return outputs;
    }, []);

    useEffect(() => {
        setting.extra.push('abacus');
    }, [setting]);

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