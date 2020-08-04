import React, {useCallback, useEffect, useState} from 'react';
import {changeStatus, StatusProps} from "store/common/game/gameSplice";
import {useAddInternal} from "hooks/use-add-interval.effect";
import {useDispatch} from "react-redux";
import Output from "./output/Output";
import {SettingAnzanProps} from "store/common/game/setting/games-types/anzan.types";
import AbacusOutput from "./abacus-output/AbacusOutput";
import {useSoundEffect} from "../use-sound.effect";
import TurboOutput from "./turbo-output/TurboOutput";

interface BasicProps {
    outputs: any[];
    setting: SettingAnzanProps;
    nextStatus: StatusProps;
    basicSound: HTMLAudioElement;
}

const Basic: React.FC<BasicProps> = (
    {
        outputs,
        setting,
        nextStatus,
        basicSound,
    }
) => {
    const [output, setOutput] = useState({num: '0', key: 0});
    const [addInterval] = useAddInternal();
    const dispatch = useDispatch();
    const [play] = useSoundEffect({basicSound});

    const changeOutput = useCallback((exercise, index) => {
        setOutput({num: exercise, key: index});
        //
        play({time: setting.time, output: exercise, type: setting.sound})
    }, [setting, play]);

    // Вывод цифр
    const outputInterval = useCallback((exercise: any, i: number = 0) => {
        addInterval(() => {
            if (i >= exercise.length)
                return dispatch(changeStatus(nextStatus));
            changeOutput(exercise[i], i++);
        }, setting.time * 1000);

        // Первый вывод числа
        changeOutput(exercise[i], i++);
    }, [dispatch, addInterval, changeOutput, nextStatus, setting]);

    useEffect(() => {
        outputInterval(outputs);
    }, [outputs, outputInterval]);

    if (setting.extra && setting.extra.includes("abacus"))
        return <AbacusOutput setting={setting} output={output.num} key={output.key}/>;

    if (setting.hasOwnProperty('anzan') && setting.anzan === 'turbo')
        return <TurboOutput output={output.num} key={output.key}/>;

    return <Output output={output.num} time={setting.time} key={output.key}/>;
};

export default React.memo(Basic);