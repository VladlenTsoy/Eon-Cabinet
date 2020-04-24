import {useCallback, useEffect} from "react";
import {SoundTypes} from "../../../../../../store/tasks/setting/types";
import {message} from "antd";

interface SettingProps {
    basicSound: HTMLAudioElement;
}

type ReturnTypes = [
    (setting: { time: number, output?: string, type: SoundTypes }) => void,
]

type UseSoundEffectTypes = (setting: SettingProps) => ReturnTypes;

export const useSoundEffect: UseSoundEffectTypes = (
    {
        basicSound
    }
) => {
    const play = useCallback(({type, output, time}) => {
        if (type === 'basic') {
            basicSound.currentTime = 0;
            basicSound.playbackRate = 1;
            basicSound.play().then();
        } else if (type === 'ru' || type === 'en') {
            if (window.speechSynthesis.getVoices().length !== 0) {
                let msg = new SpeechSynthesisUtterance(output);
                if (window.speechSynthesis.getVoices()[0].name.includes('Microsoft')) {
                    let speed = output.length === 3 ? 8 : 4;
                    msg.rate = time <= 1 ? speed / time : 3;
                } else {
                    let speed = output.length === 3 ? 3.5 : 2.5;
                    msg.rate = time <= 1 ? speed / time : 1.5;
                }
                msg.lang = type === "ru" ? 'ru-RU' : 'en-US';

                if (window.speechSynthesis.pending)
                    window.speechSynthesis.cancel();

                window.speechSynthesis.speak(msg);
            }
        }
    }, [basicSound]);

    useEffect(() => {
        if (window.speechSynthesis.getVoices().length === 0)
            message.error("Произошла ошибка! Звук в данном браузере не доступен.")
    }, []);

    return [play];
};