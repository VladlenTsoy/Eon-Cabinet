import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    changeOutputs,
    changeStats,
    gameSubSelector,
    StatsActionProps
} from "../../../../../../../store/common/game/gameSplice";
import {useLoadSoundsEffect} from "../application-output/use-load-sounds.effect";
import {LoadingBlock} from "../../../../../../../lib/components";
import {picturesFunction} from "../Application.layout";

interface ApplicationRepeatProps {
    pictures?: string[] | 'abacus' | picturesFunction;
    createOutputs?: (totals: any, currentTimes: number) => any;
    updateStats?: () => StatsActionProps;
}

const ApplicationRepeat:React.FC<ApplicationRepeatProps> = (
    {
        updateStats,
        createOutputs = (totals: any) => totals.map((total: any) => total.exercise),
        children,
    }
) => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    const totals = useSelector(gameSubSelector('totals'));
    const currentTimes = useSelector(gameSubSelector('currentTimes'));
    const setting = useSelector(gameSubSelector( 'setting'));

    // Загрузка звуков
    const [soundsLoad] = useLoadSoundsEffect({setting});

    const checkAndUpdateStats = useCallback((_totals) => {
        let stats = updateStats ? updateStats() : {all: Object.values(_totals).length};
        dispatch(changeStats(stats))
    }, [dispatch, updateStats]);

    const createAndUpdateOutputs = useCallback(async (totals) => {
        const createdOutputs = createOutputs(totals, currentTimes);
        setting.sound && await soundsLoad(createdOutputs);
        return createdOutputs
    }, [createOutputs, currentTimes, setting.sound, soundsLoad]);

    useEffect(() => {
        (async () => {
            setLoading(true);
            checkAndUpdateStats(totals);
            const createdOutputs = await createAndUpdateOutputs(totals);
            dispatch(changeOutputs(createdOutputs));
            setLoading(false);
        })();
    }, [checkAndUpdateStats, createAndUpdateOutputs, dispatch, totals]);

    // console.log('Repeat');

    if (loading)
        return <LoadingBlock title="Настройка упражнения..."/>;

    return <>{children}</>;
};

export default ApplicationRepeat;