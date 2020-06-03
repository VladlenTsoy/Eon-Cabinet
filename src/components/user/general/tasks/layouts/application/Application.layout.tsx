import React, {useCallback, useRef, useState} from 'react';
import {useDispatch} from "react-redux";
import {LoadingBlock} from "lib";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import Basic from "./basic/Basic";
import Timer from "./timer/Timer";
import {
    changeStatus,
    StatsActionProps,
    StatusProps
} from "../../../../../../store/reducers/common/game/gameSplice";
import {SettingAnzanProps} from "../../../../../../store/reducers/common/game/setting/games-types/anzan.types";
import PreparationLayout from "./preparation/Preparation.layout";
import List from "./list/List";
import {Form, Modal} from "antd";
import Double from "./double/Double";
import ApplicationCardLayout from "./ApplicationCard.layout";
import Carousel from "./carousel/Carousel";
import {useLoadSoundsEffect} from "./use-load-sounds.effect";
import {ListSettingProps} from "./list/tables-output/TablesOutput";
import {requestSetting, useStartApplication} from "./use-start-application.effect";

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
    requestSetting?: requestSetting;
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
    const [ListForm] = Form.useForm();
    const dispatch = useDispatch();
    const [requestConfig] = useState(requestSetting);

    // Загрузка звуков
    const [soundsLoad, basicSound, preparationSound] = useLoadSoundsEffect({setting});

    const {loading, outputs} = useStartApplication({
        updateStats,
        requestSetting: requestConfig,
        pictures,
        setting,
        createTotals: updateAnswersTotals,
        createOutputs,
        soundsLoad
    });

    // Контейнер сообщения
    const confirmTime = useRef<any>();

    // После завершения таймера
    const afterTimerMessage = useCallback(async () => {
        const answers = ListForm.getFieldValue('answer');
        confirmTime.current && confirmTime.current.destroy();
        if (updateResultsTotals)
            await updateResultsTotals(answers);
        dispatch(changeStatus(nextStatus));
    }, [updateResultsTotals, ListForm, dispatch, nextStatus, confirmTime]);

    // Сообщение при ранем завершении пользователем
    const earlierCompletion = useCallback((values?: any) => {
        confirmTime.current = Modal.confirm({
            icon: <ExclamationCircleOutlined/>,
            title: "У вас еще осталось время, Вы уверены что хотите перейти дальше?",
            onOk: () => {
                updateResultsTotals && updateResultsTotals(values.answer);
                dispatch(changeStatus(nextStatus));
            }
        });
    }, [dispatch, nextStatus, updateResultsTotals]);

    console.log(1);
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