import React, {useCallback} from 'react';
import {useSelector} from "react-redux";
import ApplicationLayout from "../../../layouts/application/Application.layout";
import {chunk} from "lodash";
import List from "./list/List";
import CarouselItem from "./carousel-item/CarouselItem";
import {gameSelector} from "store/game/gameSplice";

const Application: React.FC = () => {
    const {setting} = useSelector(gameSelector);

    const updateAnswersTotals = useCallback((data) => {
        return data.map((exercise: any) => ({exercise}));
    }, []);

    const createOutputs = useCallback((totals) => {
        if (setting.mode === 'basic')
            return Object.values(totals).map((total: any) => total.exercise.word);
        else
            return [chunk(Object.values(totals).map((total: any) => total.exercise.word), setting.column)];
    }, [setting.column, setting.mode]);

    const createSeveral = () => {
        let data = [];
        for (let val in setting.several)
            data.push(setting.several[val]);
        return data;
    };

    return <ApplicationLayout
        {
            ...setting.mode === 'list' &&
            {
                listSetting: {
                    column: setting.column,
                    leftNumbering: true,
                    layout: List
                }
            }
        }
        createOutputs={createOutputs}
        carouselSetting={{
            item: CarouselItem,
            topNumbering: true,
        }}
        timer
        setting={setting}
        updateAnswersTotals={updateAnswersTotals}
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
