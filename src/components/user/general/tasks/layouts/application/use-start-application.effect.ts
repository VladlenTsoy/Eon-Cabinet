import {useCallback, useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {changeStats, changeTotals, gameSelector} from "../../../../../../store/reducers/common/game/gameSplice";
import {useLoadPicturesEffect} from "./use-load-pictures.effect";
import {useLoadSoundsEffect} from "./use-load-sounds.effect";
import axios from "axios";
import {useAppContext} from "../../../../../../store/context/use-app-context";

const CancelToken = axios.CancelToken;

export type requestSetting = { url: string, method?: 'post' | 'get', setting?: any };

export const useStartApplication = (
    {
        updateStats,
        requestSetting,
        pictures,
        setting,
        createTotals = (data: any) => data.map((exercise: any) => ({exercise})),
        createOutputs = (totals: any) => totals.map((total: any) => total.exercise),
    }: any
) => {
    const {api} = useAppContext();
    const [loading, setLoading] = useState(true);
    const [outputs, setOutputs] = useState<any>([]);
    const {executionMode, currentTimes, totals} = useSelector(gameSelector);
    const dispatch = useDispatch();
    const source = useMemo(() => CancelToken.source(), []);

    // Загрузка картинок
    const [picturesLoad] = useLoadPicturesEffect({pictures});

    // Загрузка звуков
    const [soundsLoad] = useLoadSoundsEffect({setting});

    const fetch = useCallback(async () => {
        const {method, url} = requestSetting;
        return method === 'post' ?
            await api.user.post(url, setting, {cancelToken: source.token}) :
            await api.user.get(url, {params: setting, cancelToken: source.token});
    }, [api.user, requestSetting, setting, source.token]);

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
        const createdTotals = await createAndUpdateTotals(response.data);
        const createdOutputs = await createAndUpdateOutputs(createdTotals);
        setOutputs(createdOutputs);
    },[createAndUpdateOutputs, createAndUpdateTotals, fetch]);

    const checkAndUpdateStats = useCallback((_totals) => {
        let stats = updateStats ? updateStats() : {all: Object.values(_totals).length};
        dispatch(changeStats(stats))
    }, [dispatch, updateStats]);

    useEffect(() => {
        (async () => {
            setLoading(true);
            if (requestSetting && executionMode === 'fetch') {
                await fetchAndCreateAndUpdateOutputs();
            } else {
                const createdOutputs = await createAndUpdateOutputs(totals);
                setOutputs(createdOutputs);
            }
            checkAndUpdateStats(totals);
            setLoading(false);
        })();

        console.log(2)
        // return () => {
        //     source.cancel();
        // }
    }, [checkAndUpdateStats, createAndUpdateOutputs, executionMode, fetchAndCreateAndUpdateOutputs, requestSetting, source, totals]);

    return {outputs, loading};
}