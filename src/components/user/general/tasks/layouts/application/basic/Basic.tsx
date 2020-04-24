import React, {useCallback, useEffect, useState} from 'react';
import {gameChangeStatus} from "store/game/actions";
import {useAddInternal} from "effects/use-add-interval.effect";
import {useDispatch, useSelector} from "react-redux";
import {StatusProps} from "store/game/types";
import {totalsSelect} from "store/tasks/totals/reducer";
import {game} from "store/game/reducer";
import Output from "./output/Output";
import {SettingAnzanProps} from "store/tasks/setting/games-types/anzan.types";
import AbacusOutput from "./abacus-output/AbacusOutput";
import {useSoundEffect} from "../use-sound.effect";
import TurboOutput from "./turbo-output/TurboOutput";

interface BasicProps {
    setting: SettingAnzanProps;
    nextStatus: StatusProps;
    basicSound: HTMLAudioElement;
}

const Basic: React.FC<BasicProps> = (
    {
        setting,
        nextStatus,
        basicSound,
    }
) => {
    const totals = useSelector(totalsSelect);
    const {currentTimes} = useSelector(game);
    const [output, setOutput] = useState();
    const [addInterval] = useAddInternal();
    const [play] = useSoundEffect({basicSound});
    const dispatch = useDispatch();
    const [isMultiplication] = useState(setting.mode === 'multiply' || setting.mode === 'divide');

    const changeOutput = useCallback((exercise) => {
        setOutput(exercise);
        //
        play({time: setting.time, output: exercise, type: setting.sound})
    }, [setting, basicSound]);

    // Вывод цифр
    const outputInterval = useCallback((exercise: any, i: number = 0) => {
        if (isMultiplication)
            return changeOutput(exercise);

        addInterval(() => {
            if (i >= exercise.length)
                return dispatch(gameChangeStatus(nextStatus));
            changeOutput(exercise[i++]);
        }, setting.time * 1000);

        // Первый вывод числа
        changeOutput(exercise[i++]);
    }, [dispatch, addInterval, isMultiplication]);

    useEffect(() => {
        outputInterval(totals[currentTimes].output);
    }, [outputInterval, totals, currentTimes]);

    if (setting.extra && setting.extra.includes("abacus"))
        return <AbacusOutput setting={setting} output={output}/>;

    if (setting.hasOwnProperty('anzan') && setting.anzan === 'turbo')
        return <TurboOutput output={output} key={output}/>;

    return <Output output={output} time={setting.time} key={output}/>;
};

export default Basic;