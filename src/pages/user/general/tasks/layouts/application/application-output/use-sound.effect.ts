import {useCallback, useEffect} from "react";
import {SoundTypes} from "../../../../../../../store/common/game/setting/types";
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
            if (typeof output !== 'string' && typeof output !== 'number') return;

            const urlAudio = (`http://192.168.1.37:4000/sounds/numbers/${type}/${output}.mp3`);
            const sound = new Audio(urlAudio);
            sound.currentTime = type === 'en' ? 0.125 : 0.085;
            let playbackRate = 1.5;

            const length = String(output).replace(/^\D+/g, '').length;
            if (length === 1)
                playbackRate = 0.3 < time && time < 0.6 ? 2 : 0.5 < time && time < 1 ? 1.8 : 1.5;

            else if (length === 2)
                playbackRate = 0.5 < time && time < 0.8 ? 2 : 0.7 < time && time < 1 ? 1.8 : 1.5;

            else if (length === 3)
                playbackRate = 0.8 < time && time < 1 ? 2 : 0.9 < time && time < 1.5 ? 1.8 : 1.5;

            sound.playbackRate = playbackRate + (type === 'en' ? 0.2 : 0);

            if (length <= 3)
                sound.play().then();
        }
    }, [basicSound]);

    useEffect(() => {
        if (typeof window.Audio === "undefined")
            message.error("Произошла ошибка! Звук в данном браузере не доступен.")
    }, []);

    return [play];
};