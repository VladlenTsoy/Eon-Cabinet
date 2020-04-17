import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {useApiUserGeneral} from "../../../../../../../effects/use-api-user-general.effect";
import IconAbacus from "../../../../../../../assets/images/tasks/abacus.svg";
import {LoadingBlock} from "lib";
import OtherApplication from "../../anzan/application/other/OtherApplication";
import ListApplication from "../../anzan/application/list/ListApplication";

const Application = () => {
    const {game} = useSelector((state: any) => state);
    const {setting, currentTimes} = game;

    // Если умножение
    const [isMultiplication] = useState(setting.mode !== 'plus-minus');

    const [loading, data] = useApiUserGeneral({
        url: setting.type_task === 'list' ?
            `/custom-exercises/${setting.custom_exercises_id}` :
            `/custom-exercises/${setting.custom_exercises_id}?currentTimes=${currentTimes}`,
        config: {params: setting},
        afterRequest: async () => {
            if (setting.extra.includes('abacus')) {
                return new Promise((resolve => {
                    const iconAbacus = new Image();
                    iconAbacus.onload = () => resolve(true);
                    iconAbacus.src = IconAbacus;
                }));
            }
        }
    });

    /**
     * Вывод мода упражнения
     *
     * @param anzan
     */
    const outputApplication = (anzan: string): any => {
        switch (anzan) {
            case 'list':
                return <ListApplication
                    numbers={data}
                    isMultiplication={isMultiplication}
                />;
            case 'basic':
                return <OtherApplication
                    numbers={data}
                    isMultiplication={isMultiplication}
                />;
        }
    };

    return loading ?
        <LoadingBlock title="Загрузка чисел..."/> :
        outputApplication(setting.type_task);
};

export default Application;