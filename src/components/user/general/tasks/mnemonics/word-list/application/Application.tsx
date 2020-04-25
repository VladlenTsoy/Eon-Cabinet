import React, {useCallback} from 'react';
import {useSelector} from "react-redux";
import ApplicationLayout from "../../../layouts/application/Application.layout";
import {settingAnzan} from "../../../../../../../store/tasks/setting/reducer";

const Application: React.FC = () => {
    const setting = useSelector(settingAnzan);

    const updateAnswersTotals = useCallback((data) => {
        return data.map((exercise: any) => ({exercise}));
    }, []);

    const createOutputs = useCallback((totals) => {
        return Object.values(totals).map((total: any) => total.exercise.word);
    }, []);

    const updateStats = useCallback(() => {
        return {all: 1};
    }, []);

    const createSeveral = () => {
        let data = [];
        for (let val in setting.several)
            data.push(setting.several[val]);
        return data;
    };

    return <ApplicationLayout
        createOutputs={createOutputs}
        timer
        setting={setting}
        updateAnswersTotals={updateAnswersTotals}
        updateStats={updateStats}
        displayType={setting.mode === 'basic' ? "carousel" : 'list'}
        requestSetting={{
            url: '/task/words',
            method: 'post',
            setting: {several: createSeveral()}
        }}
        nextStatus="answer"
    />
};

export default Application;