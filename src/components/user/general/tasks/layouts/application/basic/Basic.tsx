import React, {useCallback, useEffect, useState} from 'react';
import {gameChangeStatus} from "../../../../../../../store/game/actions";
import {useAddInternal} from "../../../../../../../effects/use-add-interval.effect";
import {useDispatch, useSelector} from "react-redux";
import {StatusProps} from "../../../../../../../store/game/types";
import {totalsSelect} from "../../../../../../../store/tasks/totals/reducer";
import {game} from "../../../../../../../store/game/reducer";
import ApplicationAnzanWrapper from "../_old/anzan/Anzan.layout";
import {Card} from "../../../../../../../lib";
import Output from "./output/Output";
import {message} from "antd";
import {SettingAnzanProps} from "../../../../../../../store/tasks/setting/games-types/anzan.types";
import AbacusOutput from "./abacus-output/AbacusOutput";

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
    const dispatch = useDispatch();

    const changeOutput = useCallback((exercise) => {
        let upOutput = exercise;
        if (setting.extra) {
            if (setting.extra.includes('plus') && Math.sign(upOutput) !== -1)
                upOutput = '+' + upOutput;
            if (setting.extra.includes('comma'))
                upOutput = upOutput.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        setOutput(upOutput);

        if (setting.sound === 'basic') {
            basicSound.currentTime = 0;
            basicSound.playbackRate = 1;
            basicSound.play().then();
        } else if (setting.sound === 'ru' || setting.sound === 'en') {
            if (window.speechSynthesis.getVoices().length !== 0) {
                let msg = new SpeechSynthesisUtterance(upOutput);
                if (window.speechSynthesis.getVoices()[0].name.includes('Microsoft')) {
                    let speed = parseInt(upOutput.length) === 3 ? 8 : 4;
                    msg.rate = setting.time <= 1 ? speed / setting.time : 3;
                } else {
                    let speed = parseInt(upOutput.length) === 3 ? 3.5 : 2.5;
                    msg.rate = setting.time <= 1 ? speed / setting.time : 1.5;
                }
                msg.lang = setting.sound === "ru" ? 'ru-RU' : 'en-US';

                if (window.speechSynthesis.pending)
                    window.speechSynthesis.cancel();

                window.speechSynthesis.speak(msg);
            }
        }
    }, [setting, basicSound]);

    // Вывод цифр
    const outputInterval = useCallback((exercise: any, i: number = 0) => {
        addInterval(() => {
            if (i >= exercise.length)
                return dispatch(gameChangeStatus(nextStatus));
            changeOutput(exercise[i++]);
        }, setting.time * 1000);

        // Первый вывод числа
        changeOutput(exercise[i++]);
    }, [dispatch, addInterval]);

    useEffect(() => {
        outputInterval(totals[currentTimes].output);
        if (window.speechSynthesis.getVoices().length === 0)
            message.error("Произошла ошибка! Звук в данном браузере не доступен.")
    }, [outputInterval, totals]);

    if (setting.extra && setting.extra.includes("abacus"))
        return <ApplicationAnzanWrapper>
            <Card>
                <AbacusOutput setting={setting} output={output} key={output}/>
            </Card>
        </ApplicationAnzanWrapper>;

    return <ApplicationAnzanWrapper>
        <Card>
            <Output output={output} time={setting.time} key={output}/>
        </Card>
    </ApplicationAnzanWrapper>;
};

export default Basic;