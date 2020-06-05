import React, {useCallback, useEffect} from 'react';
import {random} from 'lodash';
import {useDispatch, useSelector} from "react-redux";
import ApplicationLayout from "../../../layouts/application/Application.layout";
import {useUpdateOutputEffect} from "../../../layouts/application/application-output/use-update-output.effect";
import {gameSubSelector, changeTotals} from "../../../../../../../store/reducers/common/game/gameSplice";

const Application: React.FC<any> = () => {
    const setting = useSelector(gameSubSelector('setting'));
    const executionMode = useSelector(gameSubSelector('executionMode'));
    const dispatch = useDispatch();

    const [, , updaterOutput] = useUpdateOutputEffect({extra: setting.extra});

    useEffect((data = []) => {
        if (executionMode === 'fetch') {
            for (let i = 0; i < setting.count; i++) {
                let number = random(setting.from, setting.to);
                data[i] = {
                    exercise: number,
                    answer: number
                };
            }
            dispatch(changeTotals(data))
        }
    }, [dispatch, executionMode, setting.count, setting.from, setting.to]);

    const updateStats = useCallback(() => {
        return {all: setting.count};
    }, [setting]);

    const createOutputs = useCallback((totals) => {
        return totals.map((total: any) => updaterOutput(total.exercise));
    }, [updaterOutput]);

    return <ApplicationLayout
        createOutputs={createOutputs}
        displayType="basic"
        updateStats={updateStats}
        pictures="abacus"
    />
};

export default Application;