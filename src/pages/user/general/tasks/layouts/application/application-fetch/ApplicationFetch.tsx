import React from 'react';
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    changeStats,
    changeTotals,
    StatsActionProps,
    changeOutputs, gameSubSelector
} from "store/common/game/gameSplice";
import { useLoadPicturesEffect } from "../application-output/use-load-pictures.effect";
import axios from "axios";
import { useAppContext } from "store/context/use-app-context";
import { LoadingBlock } from 'lib/components';
import { useLoadSoundsEffect } from '../application-output/use-load-sounds.effect';
import {picturesFunction} from "../Application.layout";

const CancelToken = axios.CancelToken;

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
        createTotals ,
        createOutputs,
        children,
    }
) => {
    const {api, user} = useAppContext();
    const [loading, setLoading] = useState(true);
    const currentTimes = useSelector(gameSubSelector('currentTimes'));
    const setting = useSelector(gameSubSelector( 'setting'));
    const dispatch = useDispatch();
    const source = useMemo(() => CancelToken.source(), []);
    const sourceCancel = useMemo(() => source.cancel, [source]);

    // Загрузка картинок
    const [picturesLoad] = useLoadPicturesEffect({ pictures });
    // Загрузка звуков
    const [soundsLoad] = useLoadSoundsEffect({setting});

    const checkAndUpdateStats = useCallback((_totals) => {
        let stats = updateStats ? updateStats() : { all: Object.values(_totals).length };
        dispatch(changeStats(stats))
    }, [dispatch, updateStats]);

    const fetch = useCallback(async () => {
        try {
            return requestSetting.method === 'post' ?
                await api[user?'user':'guest'].post(requestSetting.url, requestSetting.setting || setting, { cancelToken: source.token }) :
                await api[user?'user':'guest'].get(requestSetting.url, { params: requestSetting.setting || setting, cancelToken: source.token });
        } catch (e) {

        }
    }, [api, user, requestSetting, setting, source.token]);

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
        const createdTotals = await createAndUpdateTotals(response.data);
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

        return () => {
            sourceCancel();
        }
    }, [fetchAndCreateAndUpdateOutputs, sourceCancel]);

    // console.log('Fetch');

    if (loading)
        return <LoadingBlock title="Настройка упражнения..." />;

    return <>{children}</>;
};

export default ApplicationFetch;