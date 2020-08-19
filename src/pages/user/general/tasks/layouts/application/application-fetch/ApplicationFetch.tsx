import React from 'react';
import {useCallback, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {
    changeStats,
    changeTotals,
    changeOutputs,
    StatsActionProps, gameSubSelector
} from "store/common/game/gameSplice";
import {useLoadPicturesEffect} from "../application-output/use-load-pictures.effect";
import {LoadingBlock} from 'lib/ui';
import {useLoadSoundsEffect} from '../application-output/use-load-sounds.effect';
import {picturesFunction} from "../Application.layout";
import {useUser} from "../../../../../../../hooks/use-user";
import {fetchGameExercises} from "../../../../../../../store/common/game/fetchGameExercises";
import {useCommonDispatch} from "../../../../../../../store/common/store";

interface ApplicationFetchProps {
    pictures?: string[] | 'abacus' | picturesFunction;
    requestSetting: { url: string, method?: 'post' | 'get', setting?: any };
    createTotals: (data: any, currentTimes?: number) => any;
    createOutputs: (totals: any, currentTimes: number) => any;
    updateStats?: () => StatsActionProps;
}

const ApplicationFetch: React.FC<ApplicationFetchProps> = (
    {
        updateStats,
        requestSetting,
        pictures,
        createTotals,
        createOutputs,
        children,
    }
) => {
    const {user} = useUser();
    const [loading, setLoading] = useState(true);
    const currentTimes = useSelector(gameSubSelector('currentTimes'));
    const setting = useSelector(gameSubSelector('setting'));
    const dispatch = useCommonDispatch();

    // Загрузка картинок
    const [picturesLoad] = useLoadPicturesEffect({pictures});
    // Загрузка звуков
    const [soundsLoad] = useLoadSoundsEffect({setting});

    const checkAndUpdateStats = useCallback((_totals) => {
        let stats = updateStats ? updateStats() : {all: Object.values(_totals).length};
        dispatch(changeStats(stats))
    }, [dispatch, updateStats]);

    /** TODO - Cancel **/
    const fetch = useCallback(async () => {
         const action = await dispatch(fetchGameExercises({requestSetting, setting, user}))
        return action.payload
    }, [user, setting, dispatch]);

    const createAndUpdateTotals = useCallback(async (data) => {
        pictures && await picturesLoad(data);
        const createdTotals = createTotals(data);
        dispatch(changeTotals(createdTotals));
        return createdTotals;
    }, [createTotals, dispatch, pictures, picturesLoad]);

    const createAndUpdateOutputs = useCallback(async (totals) => {
        const createdOutputs = createOutputs(totals, currentTimes);
        setting.sound && await soundsLoad(createdOutputs);
        return createdOutputs
    }, [createOutputs, currentTimes, setting.sound, soundsLoad]);

    const fetchAndCreateAndUpdateOutputs = useCallback(async () => {
        const response = await fetch();
        if (!response) return null;
        const createdTotals = await createAndUpdateTotals(response);
        checkAndUpdateStats(createdTotals);
        const createdOutputs = await createAndUpdateOutputs(createdTotals);
        dispatch(changeOutputs(createdOutputs));
    }, [checkAndUpdateStats, createAndUpdateOutputs, createAndUpdateTotals, dispatch, fetch]);

    useEffect(() => {
        (async () => {
            setLoading(true);
            await fetchAndCreateAndUpdateOutputs();
            setLoading(false);
        })();
    }, [fetchAndCreateAndUpdateOutputs]);

    if (loading)
        return <LoadingBlock title="Настройка упражнения..."/>;

    return <>{children}</>;
};

export default ApplicationFetch;