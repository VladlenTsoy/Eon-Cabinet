import React, {useCallback} from 'react';
import {useSelector} from "react-redux";
import {settingAnzan} from "../../../../../../../store/tasks/setting/reducer";
import ApplicationLayout from "../../../layouts/application/Application.layout";
import Carousel from "./carousel/Carousel";

const Application: React.FC = () => {
    let setting = useSelector(settingAnzan);

    const updateAnswersTotals = useCallback((data) => {
        return data.map((exercise: any) => ({exercise}));
    }, []);

    const createOutputs = useCallback((totals) => {
        return Object.values(totals).map((total: any) => total.exercise);
    }, [setting]);

    const updateStats = useCallback(() => {
        return {all: 1};
    }, []);

    const picturesLoad = useCallback((data) => {
        let flags = data.map((exercise: any) => exercise.url_flag);
        let emblems = data.map((exercise: any) => exercise.url_emblem);
        return flags.concat(emblems);
    }, []);

    return <ApplicationLayout
        createOutputs={createOutputs}
        timer
        pictures={picturesLoad}
        setting={setting}
        updateAnswersTotals={updateAnswersTotals}
        updateStats={updateStats}
        displayType="carousel"
        requestSetting={{
            url: '/task/countries',
            method: 'post',
            setting,
        }}
        CarouselItem={Carousel}
        nextStatus="answer"
    />
};

export default Application;