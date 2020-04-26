import React, {useCallback, useEffect, useState} from 'react';
import {useApiUserGeneral} from "effects/use-api-user-general.effect";
import IconAbacus from "assets/images/tasks/abacus.svg";
import {useDispatch, useSelector} from "react-redux";
import {game} from "store/game/reducer";
import {LoadingBlock} from "lib";
import {usePreloadPictures} from "effects/use-preload-pictures.effect";
import Basic from "./basic/Basic";
import Timer from "./_old/timer/Timer";
import {totalsChange} from "store/tasks/totals/action";
import {StatsActionProps, StatusProps} from "store/game/types";
import {gameChangeStats} from "../../../../../../store/game/actions";
import {SettingAnzanProps} from "../../../../../../store/tasks/setting/games-types/anzan.types";
import PreparationLayout from "./preparation/Preparation.layout";
import List from "./list/List";
import {Form, message} from "antd";
import Double from "./double/Double";
import ApplicationCardLayout from "./ApplicationCard.layout";
import Carousel from "./carousel/Carousel";
import {totalsSelect} from "../../../../../../store/tasks/totals/reducer";

const BasicSound = require('assets/sounds/anzan.ogg');

type picturesFunction = (exercises: any) => any[];

interface ApplicationProps {
    setting: SettingAnzanProps;
    displayType: SettingAnzanProps['anzan'] | 'carousel' | 'custom';
    pictures?: string[] | 'abacus' | picturesFunction;
    listSetting?: { column: any, list: any, leftNumbering: boolean }
    requestSetting?: { url: string, method?: 'post' | 'get', setting?: any };
    timer?: boolean;
    updateResultsTotals?: (answers: any[]) => any;
    updateAnswersTotals: (data: any, currentTimes: number) => any;
    createOutputs: (totals: any, currentTimes: number) => any;
    updateStats: () => StatsActionProps;
    nextStatus?: StatusProps;
    CarouselItem?: React.FC<any>;
    CustomDisplay?: React.FC<any>;
}

const ApplicationLayout: React.FC<ApplicationProps> = (
    {
        listSetting,
        createOutputs,
        setting,
        displayType,
        pictures,
        requestSetting,
        timer,
        updateAnswersTotals,
        updateResultsTotals,
        updateStats,
        nextStatus = 'answer',
        CarouselItem,
        CustomDisplay,
    }
) => {
    const totals = useSelector(totalsSelect);
    const [outputs, setOutputs] = useState<any>([]);
    const [ListForm] = Form.useForm();
    const {executionMode, currentTimes} = useSelector(game);
    const dispatch = useDispatch();
    const [, preloadImage] = usePreloadPictures();
    const [basicSound] = useState<HTMLAudioElement>(new Audio(BasicSound));

    // Загрузка картинок
    const picturesLoad = useCallback(async (data: any) => {
        try {
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
        } catch (e) {
            message.error("Ошибка, не удалось загрузить изображения!")
        }
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

        let _totals = updateAnswersTotals(data, currentTimes);
        dispatch(totalsChange(_totals));

        let outputsTotals = createOutputs(_totals, currentTimes);
        setOutputs(outputsTotals);

        let stats = updateStats();
        dispatch(gameChangeStats(stats))
    }, [updateAnswersTotals, updateStats, setting, dispatch, currentTimes, soundsLoad, picturesLoad, pictures]);

    // Загрузка примеров
    const [loading] = useApiUserGeneral({
        method: requestSetting && requestSetting.method || 'get',
        url: requestSetting && requestSetting.url || '',
        config: {params: requestSetting && requestSetting.setting || setting},
        afterRequest: afterRequest,
        cancel: !requestSetting || executionMode === 'repeat'
    });

    useEffect(() => {
        if (executionMode === 'repeat') {
            console.log(totals, currentTimes);
            let outputsTotals = createOutputs(totals, currentTimes);
            setOutputs(outputsTotals);
        } else if (!requestSetting && executionMode === 'first') {
            afterRequest([]).then();
        }
    }, [requestSetting, totals, currentTimes, afterRequest]);

    const afterMessage = useCallback(async () => {
        const answers = ListForm.getFieldValue('answer');
        if (updateResultsTotals) {
            await updateResultsTotals(answers);
        }
    }, [updateResultsTotals, ListForm]);

    if (loading)
        return <LoadingBlock title="Загрузка чисел..."/>;

    return <PreparationLayout>
        <ApplicationCardLayout>
            {timer && <Timer time={setting.time} afterMessage={afterMessage}/>}
            {/**/}
            {(displayType === 'basic' || displayType === 'turbo') &&
            <Basic setting={setting} nextStatus={nextStatus} basicSound={basicSound} outputs={outputs}/>}
            {/**/}
            {displayType === 'list' && listSetting &&
            <List listForm={ListForm} listSetting={listSetting} updateResultsTotals={updateResultsTotals}
                  outputs={outputs}/>}
            {/**/}
            {displayType === 'double' && setting.anzan === 'double' &&
            <Double setting={setting} nextStatus={nextStatus} basicSound={basicSound} outputs={outputs}/>}
            {/**/}
            {displayType === 'carousel' &&
            <Carousel topNumber nextStatus={nextStatus} outputs={outputs}>
                {/*{CarouselItem && <CarouselItem outputs={outputs} setting={setting}/>}*/}
                {CarouselItem && CarouselItem({outputs, setting})}
            </Carousel>}
            {/**/}
            {displayType === 'custom' && CustomDisplay && <CustomDisplay outputs={outputs} setting={setting} finishHandler={() => null}/>}
        </ApplicationCardLayout>
    </PreparationLayout>;
};

export default React.memo(ApplicationLayout);