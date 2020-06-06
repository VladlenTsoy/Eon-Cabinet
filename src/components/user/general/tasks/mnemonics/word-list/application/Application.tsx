import React, {useCallback, useState} from 'react';
import {useSelector} from "react-redux";
import ApplicationLayout from "../../../layouts/application/Application.layout";
import {useScreenWindow} from "effects/use-screen-window.effect";
import {chunk} from "lodash";
import List from "./list/List";
import CarouselItem from "./carousel-item/CarouselItem";
import {gameSelector} from "../../../../../../../store/reducers/common/game/gameSplice";

const Application: React.FC = () => {
    const {setting} = useSelector(gameSelector);
    const [, isBreakpoint] = useScreenWindow({breakpoint: 'sm'});
    const [column] = useState(isBreakpoint ? 2 : 5);

    const updateAnswersTotals = useCallback((data) => {
        return data.map((exercise: any) => ({exercise}));
    }, []);

    const createOutputs = useCallback((totals) => {
        if (setting.mode === 'basic')
            return Object.values(totals).map((total: any) => total.exercise.word);
        else
            return [chunk(Object.values(totals).map((total: any) => total.exercise.word), column)];
    }, [column, setting.mode]);

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
                    column: column,
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