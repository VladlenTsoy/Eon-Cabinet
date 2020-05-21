import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useApiUserGeneral} from "effects/use-api-user-general.effect";
import {useDispatch, useSelector} from "react-redux";
import {game} from "store/game/reducer";
import {LoadingBlock} from "lib";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import Basic from "./basic/Basic";
import Timer from "./timer/Timer";
import {totalsChange} from "store/tasks/totals/action";
import {StatsActionProps, StatusProps} from "store/game/types";
import {gameChangeStats, gameChangeStatus} from "../../../../../../store/game/actions";
import {SettingAnzanProps} from "../../../../../../store/tasks/setting/games-types/anzan.types";
import PreparationLayout from "./preparation/Preparation.layout";
import List from "./list/List";
import {Form, Modal} from "antd";
import Double from "./double/Double";
import ApplicationCardLayout from "./ApplicationCard.layout";
import Carousel from "./carousel/Carousel";
import {totalsSelect} from "../../../../../../store/tasks/totals/reducer";
import {useLoadPicturesEffect} from "./use-load-pictures.effect";
import {useLoadSoundsEffect} from "./use-load-sounds.effect";
import {ListSettingProps} from "./list/tables-output/TablesOutput";

type picturesFunction = (exercises: any) => any[];

interface CarouselSettingProps {
    topNumbering?: boolean;
    item: React.FC<any>
}

interface ApplicationProps {
    setting: SettingAnzanProps;
    displayType: SettingAnzanProps['anzan'] | 'carousel' | 'custom';
    pictures?: string[] | 'abacus' | picturesFunction;
    listSetting?: ListSettingProps
    carouselSetting?: CarouselSettingProps
    requestSetting?: { url: string, method?: 'post' | 'get', setting?: any };
    timer?: boolean;
    updateResultsTotals?: (answers: any[]) => any;
    updateAnswersTotals?: (data: any, currentTimes: number) => any;
    createOutputs?: (totals: any, currentTimes: number) => any;
    updateStats?: () => StatsActionProps;
    nextStatus?: StatusProps;
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
        carouselSetting,
        CustomDisplay,
    }
) => {
    const totals = useSelector(totalsSelect);
    const [outputs, setOutputs] = useState<any>([]);
    const [ListForm] = Form.useForm();
    const {executionMode, currentTimes} = useSelector(game);
    const dispatch = useDispatch();

    // Загрузка картинок
    const [picturesLoad] = useLoadPicturesEffect({pictures});

    // Загрузка звуков
    const [soundsLoad, basicSound, preparationSound] = useLoadSoundsEffect({setting});

    const checkAndUpdateStats = useCallback((_totals) => {
        let stats = updateStats ? updateStats() : {all: Object.values(_totals).length};
        dispatch(gameChangeStats(stats))
    }, [dispatch, updateStats]);

    // После завершения примеров
    const afterRequest = useCallback(async (data: any) => {
        if (pictures) await picturesLoad(data);

        let _totals = updateAnswersTotals ?
            updateAnswersTotals(data, currentTimes) :
            data.map((exercise: any) => ({exercise}));
        dispatch(totalsChange(_totals));

        let outputsTotals = createOutputs ?
            createOutputs(_totals, currentTimes) :
            Object.values(_totals).map((total: any) => total.exercise);

        if (setting.sound) await soundsLoad(outputsTotals);
        setOutputs(outputsTotals);

        checkAndUpdateStats(_totals);
    }, [updateAnswersTotals, checkAndUpdateStats, setting, dispatch, currentTimes, soundsLoad, picturesLoad, pictures, createOutputs]);

    // Загрузка примеров
    const [loading] = useApiUserGeneral({
        method: (requestSetting && requestSetting.method) || 'get',
        url: (requestSetting && requestSetting.url) || '',
        config: {params: (requestSetting && requestSetting.setting) || setting},
        afterRequest: afterRequest,
        cancel: !requestSetting || (executionMode === 'repeat' && !!totals[currentTimes]?.exercise)
    });

    // Повторение упраженения
    const repeatTaskExercises = useCallback(() => {
        let outputsTotals = createOutputs ?
            createOutputs(totals, currentTimes) :
            Object.values(totals).map((total: any) => total.exercise);
        checkAndUpdateStats(totals);
        setOutputs(outputsTotals);
    }, [totals, currentTimes, createOutputs, checkAndUpdateStats]);

    //
    useEffect(() => {
        // Повторение упраженения
        if (executionMode === 'repeat' && totals[currentTimes]?.exercise)
            repeatTaskExercises()
    }, [executionMode, repeatTaskExercises, totals, currentTimes]);

    useEffect(() => {
        // Генерация примеров
        if (!requestSetting && executionMode === 'first')
            afterRequest([]).then();
    }, [requestSetting, executionMode, afterRequest]);

    // Контейнер сообщения
    const confirmTime = useRef<any>();

    // После завершения таймера
    const afterTimerMessage = useCallback(async () => {
        const answers = ListForm.getFieldValue('answer');
        confirmTime.current && confirmTime.current.destroy();
        if (updateResultsTotals)
            await updateResultsTotals(answers);
        dispatch(gameChangeStatus(nextStatus));
    }, [updateResultsTotals, ListForm, dispatch, nextStatus, confirmTime]);

    // Сообщение при ранем завершении пользователем
    const earlierCompletion = useCallback((values?: any) => {
        confirmTime.current = Modal.confirm({
            icon: <ExclamationCircleOutlined/>,
            title: "У вас еще осталось время, Вы уверены что хотите перейти дальше?",
            onOk: () => {
                updateResultsTotals && updateResultsTotals(values.answer);
                dispatch(gameChangeStatus(nextStatus));
            }
        });
    }, [dispatch, nextStatus, updateResultsTotals]);

    if (loading)
        return <LoadingBlock title="Настройка упражнения..."/>;

    return <PreparationLayout sounds={preparationSound} basicSound={basicSound} setting={setting}>
        <ApplicationCardLayout>
            {timer && <Timer time={setting.time} afterMessage={afterTimerMessage}/>}
            {/* Обычний режим с числами*/}
            {(displayType === 'basic' || displayType === 'turbo') &&
            <Basic setting={setting} nextStatus={nextStatus} basicSound={basicSound} outputs={outputs}/>}
            {/* Листы */}
            {displayType === 'list' && listSetting &&
            <List listForm={ListForm} listSetting={listSetting} earlierCompletion={earlierCompletion}
                  outputs={outputs}/>}
            {/* Двойной с числами */}
            {displayType === 'double' && setting.anzan === 'double' &&
            <Double setting={setting} nextStatus={nextStatus} basicSound={basicSound} outputs={outputs}/>}
            {/* Карусель */}
            {displayType === 'carousel' &&
            <Carousel topNumber={carouselSetting?.topNumbering} outputs={outputs} earlierCompletion={earlierCompletion}>
                {carouselSetting && carouselSetting.item({outputs, setting})}
            </Carousel>}
            {/* Пользовательский */}
            {displayType === 'custom' && CustomDisplay &&
            <CustomDisplay outputs={outputs} setting={setting} finishHandler={afterTimerMessage}/>}
        </ApplicationCardLayout>
    </PreparationLayout>;
};

export default React.memo(ApplicationLayout);