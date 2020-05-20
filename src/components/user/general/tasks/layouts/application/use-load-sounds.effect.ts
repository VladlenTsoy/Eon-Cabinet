import {useCallback, useState} from "react";

const BasicSound = require('assets/sounds/anzan.ogg');

interface Props {
    setting: any;
}

type ReturnType = [(numbers: number[]) => Promise<any>, HTMLAudioElement];

type LoadSoundTypes = (props: Props) => ReturnType;

export const useLoadSoundsEffect: LoadSoundTypes = ({setting}) => {
    const [basicSound] = useState<HTMLAudioElement>(new Audio(BasicSound));

    const createAudios = useCallback((numbers: number[]) => {
        return numbers.map((number) => {
            const urlAudio = require(`assets/sounds/numbers/${setting.sound}/${number}.mp3`);
            return new Audio(urlAudio);
        });
    }, [setting]);

    const soundsLoad = useCallback(async (numbers) => {
        if (setting.sound === 'basic')
            return await new Promise((resolve) => {
                if (basicSound.readyState < 2)
                    basicSound.oncanplaythrough = () => resolve(true);
                else
                    resolve(true);
            });

        if (setting.sound === 'ru' || setting.sound === 'en') {
            let i = 0;
            const sounds = createAudios(numbers);
            return await new Promise((resolve: any) => {
                sounds.map((value: HTMLAudioElement) => {
                    value.oncanplaythrough = () => {
                        i++;
                        sounds.length <= i && resolve(true);
                    };
                    return value;
                })
            })
        }
    }, [setting, basicSound, createAudios]);

    return [soundsLoad, basicSound];
};