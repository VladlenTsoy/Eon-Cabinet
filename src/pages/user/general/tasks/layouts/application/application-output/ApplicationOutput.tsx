import React, {useRef, useCallback} from 'react';
import PreparationLayout from './preparation/Preparation.layout';
import ApplicationCardLayout from './ApplicationCard.layout';
import {Form, Modal} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {changeStatus, gameSelector, StatusProps} from 'store/common/game/gameSplice';
import {ExclamationCircleOutlined} from "@ant-design/icons";
import {useLoadSoundsEffect} from './use-load-sounds.effect';
import Double from "./double/Double";
import Basic from "./basic/Basic";
import Timer from "./timer/Timer";
import List from "./list/List";
import Carousel from "./carousel/Carousel";
import {ListSettingProps} from "./list/tables-output/TablesOutput";
import {SettingAnzanProps} from "../../../../../../../store/common/game/setting/games-types/anzan.types";
import {CarouselSettingProps} from "../Application.layout";

interface ApplicationOutputProps {
    displayType: SettingAnzanProps['anzan'] | 'carousel' | 'custom';
    listSetting?: ListSettingProps
    carouselSetting?: CarouselSettingProps
    timer?: boolean;
    updateResultsTotals?: (answers: any[]) => any;
    nextStatus?: StatusProps;
    CustomDisplay?: React.FC<any>;
}

const ApplicationOutput: React.FC<ApplicationOutputProps> = (
    {
        listSetting,
        displayType,
        timer,
        updateResultsTotals,
        nextStatus = 'answer',
        carouselSetting,
        CustomDisplay,
    }
) => {
    const {setting, outputs} = useSelector(gameSelector);

    const [ListForm] = Form.useForm();
    const dispatch = useDispatch();

    // Загрузка звуков
    const [, basicSound, preparationSound] = useLoadSoundsEffect({setting});

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

    // console.log('Output');

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

export default React.memo(ApplicationOutput);