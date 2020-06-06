import React, {useCallback, useState} from 'react';
import {useSelector} from "react-redux";
import {chunk, random, shuffle} from 'lodash';
import ApplicationLayout from "../../../layouts/application/Application.layout";
import {useScreenWindow} from "../../../../../../../effects/use-screen-window.effect";
import List from "../../word-list/application/list/List";
import {gameSelector} from "../../../../../../../store/reducers/common/game/gameSplice";

const Application: React.FC = () => {
    const {setting} = useSelector(gameSelector);
    const [, isBreakpoint] = useScreenWindow({breakpoint: 'sm'});

    const [column] = useState(isBreakpoint ? 5 : 10);

    const updateAnswersTotals = useCallback(() => {
        let numbers = [];
        const _count = setting['task-mode'] === 'list' ? setting.count * 10 : setting.count;

        for (let i = 0; i < _count; i++) {
            let a = random(10, 99);
            let b = random(100, 999);
            numbers.push(String(setting.mode) === '1' ? a : String(setting.mode) === '3' ? (i % 2 === 0 ? a : b) : b);
        }

        return shuffle(numbers.map((number: number) => ({exercise: number, answer: number})));
    }, [setting]);

    const createOutputs = useCallback((totals) => {
        if (setting['task-mode'] === 'list')
            return [chunk(Object.values(totals).map((total: any) => total.exercise), column)];
        else
            return Object.values(totals).map((total: any) => total.exercise);
    }, [column, setting]);

    return <ApplicationLayout
        {
            ...setting['task-mode'] === 'list' &&
            {
                listSetting: {
                    column: column,
                    leftNumbering: true,
                    layout: List
                }
            }
        }
        createOutputs={createOutputs}
        displayType={setting['task-mode']}
        setting={setting}
        updateAnswersTotals={updateAnswersTotals}
        pictures="abacus"
    />
};

export default Application;