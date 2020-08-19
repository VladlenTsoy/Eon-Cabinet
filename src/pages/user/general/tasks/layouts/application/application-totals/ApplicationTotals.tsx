import React, {useCallback, useEffect, useState} from 'react';
import {picturesFunction} from "../Application.layout";
import {
    changeOutputs,
    changeStats,
    gameSubSelector,
    changeTotals,
    StatsActionProps,
} from "../../../../../../../store/common/game/gameSplice";
import {LoadingBlock} from "../../../../../../../lib/ui";
import {useLoadSoundsEffect} from "../application-output/use-load-sounds.effect";
import {useDispatch, useSelector} from "react-redux";

interface ApplicationTotalsProps {
    pictures?: string[] | 'abacus' | picturesFunction;
    createOutputs?: (totals: any, currentTimes: number) => any;
    updateStats?: () => StatsActionProps;
    createTotals: () => any;
}

const ApplicationTotals: React.FC<ApplicationTotalsProps> = (
    {
        updateStats,
        createOutputs = (totals: any) => totals.map((total: any) => total.exercise),
        createTotals,
        children,
    }
) => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

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
            const createdTotals = createTotals();
            dispatch(changeTotals(createdTotals));
            checkAndUpdateStats(createdTotals);
            const createdOutputs = await createAndUpdateOutputs(createdTotals);
            dispatch(changeOutputs(createdOutputs));
            setLoading(false);
        })();
    }, [checkAndUpdateStats, createAndUpdateOutputs, createTotals, dispatch]);

    // console.log('Totals');

    if (loading)
        return <LoadingBlock title="Настройка упражнения..."/>;

    return <>{children}</>;
};

export default ApplicationTotals;