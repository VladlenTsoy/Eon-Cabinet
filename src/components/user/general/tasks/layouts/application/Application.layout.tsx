import React, {useCallback, useState} from 'react';
import {useApiUserGeneral} from "effects/use-api-user-general.effect";
import IconAbacus from "assets/images/tasks/abacus.svg";
import {useDispatch, useSelector} from "react-redux";
import {game} from "store/game/reducer";
import {LoadingBlock} from "lib";
import {usePreloadPictures} from "effects/use-preload-pictures.effect";
import Basic from "./basic/Basic";
import Timer from "./_old/timer/Timer";
import {totalsChange} from "store/tasks/totals/action";
import {totalsSelect} from "store/tasks/totals/reducer";
import {StatsActionProps, StatusProps} from "store/game/types";
import {gameChangeStats} from "../../../../../../store/game/actions";
import {SettingAnzanProps} from "../../../../../../store/tasks/setting/games-types/anzan.types";
import PreparationLayout from "./preparation/Preparation.layout";
import List from "./list-new/List";

const BasicSound = require('assets/sounds/anzan.ogg');

type picturesFunction = (exercises: any) => any[];

interface ApplicationProps {
    setting: SettingAnzanProps;
    displayType: SettingAnzanProps['anzan'] | 'carousel' | React.ReactNode;
    pictures?: string[] | 'abacus' | picturesFunction;
    urlExercises: string;
    timer?: boolean;
    updateTotals: (data: any, totals: any, currentTimes: number) => any;
    updateStats: () => StatsActionProps;
    nextStatus: StatusProps;
}

const ApplicationLayout: React.FC<ApplicationProps> = (
    {
        setting,
        displayType,
        pictures,
        urlExercises,
        timer,
        updateTotals,
        updateStats,
        nextStatus,
    }
) => {
    const totals = useSelector(totalsSelect);
    const {executionMode, currentTimes} = useSelector(game);
    const dispatch = useDispatch();
    const [, preloadImage] = usePreloadPictures();
    const [basicSound] = useState<HTMLAudioElement>(new Audio(BasicSound));

    // Загрузка картинок
    const picturesLoad = useCallback(async (data: any) => {
        if (typeof pictures === "string" && pictures === 'abacus')
            return await new Promise((resolve => {
                const iconAbacus = new Image();
                iconAbacus.onload = () => resolve(true);
                iconAbacus.src = IconAbacus;
            }));

        if (typeof pictures === "function")
            return await preloadImage(pictures(data));

        if (typeof pictures === "object")
            return await preloadImage(pictures);

    }, [pictures]);

    // Загрузка звуков
    const soundsLoad = useCallback(async () => {
        if (setting.sound === 'basic')
            return await new Promise((resolve) => {
                if (basicSound.readyState < 2)
                    basicSound.oncanplaythrough = () => resolve(true);
                else
                    resolve(true);
            });
    }, [setting, basicSound]);

    // После завершения примеров
    const afterRequest = useCallback(async (data: any) => {
        if (pictures) await picturesLoad(data);
        if (setting.sound) await soundsLoad();

        let _totals = updateTotals(data, totals, currentTimes);
        dispatch(totalsChange(_totals));

        let stats = updateStats();
        dispatch(gameChangeStats(stats))
    }, [updateTotals, updateStats, setting, dispatch, currentTimes, soundsLoad, picturesLoad, pictures]);

    // Загрузка примеров
    const [loading] = useApiUserGeneral({
        url: urlExercises,
        config: {params: setting},
        afterRequest: afterRequest,
        cancel: executionMode === 'repeat'
    });

    if (loading)
        return <LoadingBlock title="Загрузка чисел..."/>;

    return <PreparationLayout>
        <>
            {timer && <Timer time={setting.time}/>}
            {displayType === 'basic' && <Basic setting={setting} nextStatus={nextStatus} basicSound={basicSound}/>}
            {displayType === 'list' && setting.anzan === 'list' && <List setting={setting}/>}
        </>
    </PreparationLayout>;
};

export default React.memo(ApplicationLayout);