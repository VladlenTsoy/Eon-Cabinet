import React, {useCallback, useEffect, useState} from 'react';
import {
    gameChangeStats,
    gameChangeStatus,
} from "store/game/actions";
import _ from 'lodash';
import {useDispatch, useSelector} from "react-redux";
import {Card, LoadingBlock} from "lib";
import OutputBlock from "../../../layouts/output/Output";
import {useAddTimeout} from "effects/use-add-timeout.effect";
import {useAddInternal} from "effects/use-add-interval.effect";
import ApplicationAnzanWrapper from "../../../layouts/application/anzan/Anzan.layout";
import IconAbacus from "assets/images/tasks/abacus.svg";
import {totalsChange} from "../../../../../../../store/tasks/totals/action";
import {settingChange} from "../../../../../../../store/tasks/setting/action";

const Application: React.FC<any> = () => {
    const {game} = useSelector((state: any) => state);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    const [addInterval] = useAddInternal();
    const [addTimeout] = useAddTimeout();

    const {totals, setting, status} = game;
    const sOutput = useCallback((out: string) => out, [dispatch]);

    // Output exercise
    const outputExercise = useCallback((i: number = 0) => {
        addInterval(() => {
            if (i === (setting.count))
                dispatch(gameChangeStatus(setting.extra && setting.extra.includes('group') ? 'intermediate' : 'answer'));
            else
                sOutput(totals[i++].exercise);
        }, setting.time * 1000);
        sOutput(totals[i++].exercise);
    }, [sOutput, setting, addInterval, dispatch, totals]);

    // Start Application
    const startApplication = useCallback(() => {
        sOutput('На старт');
        addTimeout([
            setTimeout(() => sOutput('Внимание'), 1000),
            setTimeout(() => sOutput('Марш'), 2000),
            setTimeout(() => outputExercise(), 3000),
        ]);
        dispatch(gameChangeStats({all: setting.count}));
    }, [dispatch, sOutput, outputExercise, addTimeout, setting]);

    const updateStore = useCallback(async (_totals: any, _setting: any) => {
        await dispatch(totalsChange(_totals));
        await dispatch(settingChange(_setting));
    }, [dispatch]);

    const createNumbers = useCallback(async () => {
        setLoading(true);
        setting.extra.push('abacus');

        new Promise((resolve => {
            const iconAbacus = new Image();
            iconAbacus.onload = () => resolve(true);
            iconAbacus.src = IconAbacus;
        }));

        for (let i = 0; i < setting.count; i++) {
            let number = _.random(setting.from, setting.to);
            totals[i] = {exercise: number, answer: number};
        }

        await updateStore(totals, setting);
        setLoading(false);
    }, [totals, setting, updateStore]);

    // Fetch algorithms or check totals exercise
    useEffect(() => {
        (async () => {
            if (status === 'refresh' || status === 'repeat')
                startApplication();
            else {
                await createNumbers();
                startApplication();
            }
        })();
    }, [status, createNumbers, startApplication]);

    return <ApplicationAnzanWrapper>
        <Card>
            {loading ? <LoadingBlock/> : <OutputBlock/>}
        </Card>
    </ApplicationAnzanWrapper>;
};

export default Application;