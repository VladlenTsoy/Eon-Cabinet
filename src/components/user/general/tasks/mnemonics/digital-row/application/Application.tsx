import React, {useCallback} from 'react';
import {useSelector} from "react-redux";
import {random} from 'lodash';
import {useAddSpaceToString} from "effects/use-add-space-to-string";
import ApplicationLayout from "../../../layouts/application/Application.layout";
import {settingAnzan} from "store/tasks/setting/reducer";
import {totalsSelect} from "store/tasks/totals/reducer";
import Custom from "./custom/Custom";

const Application: React.FC = () => {
    let setting = useSelector(settingAnzan);
    let totals: any = useSelector(totalsSelect);
    const addSpaceToString = useAddSpaceToString();

    const updateAnswersTotals = useCallback((data, currentTimes) => {
        let fromIntRand = '', toIntRand = '';
        for (let i = 0; i < setting.count; i++) {
            fromIntRand += '1';
            toIntRand += '9';
        }
        let exercise = random(Number(fromIntRand), Number(toIntRand)).toPrecision(setting.count);

        totals[currentTimes] = {
            exercise: exercise,
            answer: exercise,
        };

        return totals;
    }, [setting, totals]);

    const createOutputs = useCallback((totals, currentTimes) => {
        return addSpaceToString(totals[currentTimes].exercise)
    }, [addSpaceToString]);

    return <ApplicationLayout
        displayType="custom"
        createOutputs={createOutputs}
        timer
        setting={setting}
        updateAnswersTotals={updateAnswersTotals}
        CustomDisplay={Custom}
        nextStatus="answer"
    />
};

export default Application;