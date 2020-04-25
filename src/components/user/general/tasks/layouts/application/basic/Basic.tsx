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
import {useAddTimeout} from "../../../../../../../effects/use-add-timeout.effect";

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
    const [output, setOutput] = useState({num: '0', key: 0});
    const [addInterval] = useAddInternal();
    const [addTimeout] = useAddTimeout();
    const dispatch = useDispatch();
    const [play] = useSoundEffect({basicSound});
    const [isMultiplication] = useState(setting.mode === 'multiply' || setting.mode === 'divide');

    const changeOutput = useCallback((exercise, index) => {
        setOutput({num: exercise, key: index});
        //
        play({time: setting.time, output: exercise, type: setting.sound})
    }, [setting, basicSound]);

    // Вывод цифр
    const outputInterval = useCallback((exercise: any, i: number = 0) => {
        if (isMultiplication) {
            addTimeout([setTimeout(() => dispatch(gameChangeStatus(nextStatus)), setting.time * 1000)]);
            return changeOutput(exercise, i++);
        }

        addInterval(() => {
            if (i >= exercise.length)
                return dispatch(gameChangeStatus(nextStatus));
            changeOutput(exercise[i], i++);
        }, setting.time * 1000);

        // Первый вывод числа
        changeOutput(exercise[i], i++);
    }, [dispatch, addInterval, isMultiplication]);

    useEffect(() => {
        console.log(totals[currentTimes].output);
        outputInterval(totals[currentTimes].output);
    }, [outputInterval, totals, currentTimes]);

    if (setting.extra && setting.extra.includes("abacus"))
        return <AbacusOutput setting={setting} output={output.num} key={output.key}/>;

    if (setting.hasOwnProperty('anzan') && setting.anzan === 'turbo')
        return <TurboOutput output={output.num} key={output.key}/>;

    return <Output output={output.num} time={setting.time} key={output.key}/>;
};

export default Basic;