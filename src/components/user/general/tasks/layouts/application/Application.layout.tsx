import React, {useCallback} from 'react';
import {useApiUserGeneral} from "effects/use-api-user-general.effect";
import IconAbacus from "assets/images/tasks/abacus.svg";
import {useDispatch, useSelector} from "react-redux";
import {game} from "store/game/reducer";
import {LoadingBlock} from "lib";
import {usePreloadPictures} from "effects/use-preload-pictures.effect";
import Basic from "./basic/Basic";
import Timer from "./timer/Timer";
import {totalsChange} from "store/tasks/totals/action";
import {totalsSelect} from "store/tasks/totals/reducer";
import {StatsActionProps, StatusProps} from "store/game/types";
import {gameChangeStats} from "../../../../../../store/game/actions";

type picturesFunction = (exercises: any) => any[];
type soundsFunction = (exercises: any) => any[];

interface ApplicationProps {
    setting: any;
    displayType: 'basic' | 'turbo' | 'double' | 'list' | 'carousel' | React.ReactNode;
    sounds?: string[] | 'basic' | soundsFunction;
    pictures?: string[] | 'abacus' | picturesFunction;
    urlExercises: string;
    timer?: boolean;
    updateTotals: (data: any, totals: any, currentTimes: number) => any;
    updateStats: () => StatsActionProps;
    nextStatus: StatusProps;
    time: number;
}

const ApplicationLayout: React.FC<ApplicationProps> = (
    {
        setting,
        displayType,
        sounds,
        pictures,
        urlExercises,
        timer,
        updateTotals,
        updateStats,
        nextStatus,
        time,
    }
) => {
    const totals = useSelector(totalsSelect);
    const {executionMode, currentTimes} = useSelector(game);
    const dispatch = useDispatch();
    const [, preloadImage] = usePreloadPictures();

    // Загрузка картинок
    const picturesLoad = useCallback((data: any) => {
        if (typeof pictures === "string" && pictures === 'abacus')
            return new Promise((resolve => {
                const iconAbacus = new Image();
                iconAbacus.onload = () => resolve(true);
                iconAbacus.src = IconAbacus;
            }));

        if (typeof pictures === "function")
            return preloadImage(pictures(data));

        if (typeof pictures === "object")
            return preloadImage(pictures);

    }, [pictures]);

    // Загрузка звуков
    const soundsLoad = useCallback((data: any) => {
        console.log(data);
    }, []);

    // После завершения примеров
    const afterRequest = useCallback(async (data: any) => {
        if (pictures) await picturesLoad(data);
        if (sounds) await soundsLoad(data);

        let _totals = updateTotals(data, totals, currentTimes);
        dispatch(totalsChange(_totals));

        let stats = updateStats();
        dispatch(gameChangeStats(stats))
    }, [updateTotals, updateStats, dispatch, currentTimes, soundsLoad, picturesLoad, pictures]);

    // Загрузка примеров
    const [loading] = useApiUserGeneral({
        url: urlExercises,
        config: {params: setting},
        afterRequest: afterRequest,
        cancel: executionMode === 'repeat'
    });

    if (loading)
        return <LoadingBlock title="Загрузка чисел..."/>;

    return <>
        {timer && <Timer time={time}/>}
        {displayType === 'basic' && <Basic time={time} nextStatus={nextStatus}/>}
    </>;
};

export default ApplicationLayout;