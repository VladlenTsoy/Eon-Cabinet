import React, {useCallback} from 'react';
import {useSelector} from "react-redux";
import {random} from 'lodash';
import {useAddSpaceToString} from "hooks/use-add-space-to-string";
import ApplicationLayout from "../../../layouts/application/Application.layout";
import Custom from "./custom/Custom";
import {gameSelector} from "store/game/gameSplice";

const Application: React.FC = () => {
    const {setting} = useSelector(gameSelector);
    const addSpaceToString = useAddSpaceToString();

    const updateAnswersTotals = useCallback(() => {
        let fromIntRand = '', toIntRand = '';
        for (let i = 0; i < setting.count; i++) {
            fromIntRand += '1';
            toIntRand += '9';
        }
        let exercise = random(Number(fromIntRand), Number(toIntRand)).toPrecision(setting.count);

        return [{
            exercise: exercise,
            answer: exercise,
        }];
    }, [setting]);

    const updateStats = useCallback(() => {
        return {all: setting.count};
    }, [setting]);

    const createOutputs = useCallback((totals, currentTimes) => {
        return addSpaceToString(totals[currentTimes].exercise)
    }, [addSpaceToString]);

    return <ApplicationLayout
        displayType="custom"
        createOutputs={createOutputs}
        timer
        updateStats={updateStats}
        setting={setting}
        updateAnswersTotals={updateAnswersTotals}
        CustomDisplay={Custom}
        nextStatus="answer"
    />
};

export default Application;
