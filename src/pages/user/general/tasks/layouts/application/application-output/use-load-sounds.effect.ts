import {useCallback, useState} from "react";

const BasicSound = require('assets/sounds/anzan.ogg');
const EnReade = require('assets/sounds/preparation/en/reade.mp3');
const EnSet = require('assets/sounds/preparation/en/set.mp3');
const EnGo = require('assets/sounds/preparation/en/go.mp3');
const RuReade = require('assets/sounds/preparation/ru/reade.mp3');
const RuSet = require('assets/sounds/preparation/ru/set.mp3');
const RuGo = require('assets/sounds/preparation/ru/go.mp3');

const preparationEnObj = {
    reade: new Audio(EnReade),
    set: new Audio(EnSet),
    go: new Audio(EnGo),
};

const preparationRuObj = {
    reade: new Audio(RuReade),
    set: new Audio(RuSet),
    go: new Audio(RuGo),
};

export interface PreparationSoundProps {
    reade: HTMLAudioElement;
    set: HTMLAudioElement;
    go: HTMLAudioElement;
}

interface Props {
    setting: any;
}

type ReturnType = [(numbers: number[]) => Promise<any>, HTMLAudioElement, PreparationSoundProps];

type LoadSoundTypes = (props: Props) => ReturnType;

export const useLoadSoundsEffect: LoadSoundTypes = ({setting}) => {
    const [basicSound] = useState<HTMLAudioElement>(new Audio(BasicSound));

    const createAudios = useCallback((numbers: number[]) => {
        return numbers.map((number) => {
            const urlAudio = `http://192.168.1.37:4000/sounds/numbers/${setting.sound}/${number}.mp3`;
            return new Audio(urlAudio);
        });
    }, [setting]);

    const soundsLoad = useCallback(async (numbers) => {
        if (setting.sound === 'basic') {
            return await new Promise((resolve) => {
                if (basicSound.readyState < 2)
                    basicSound.oncanplaythrough = () => resolve(true);
                else
                    resolve(true);
            });
        } else if (setting.sound === 'ru' || setting.sound === 'en') {
            let i = 0;
            const preparation = Object.values(setting.sound === 'ru' ? preparationRuObj : preparationEnObj);
            const sounds = createAudios(numbers);
            return await new Promise((resolve: any) => {
                sounds.concat(preparation)
                    .map((value: HTMLAudioElement) => {
                        value.oncanplaythrough = () => {
                            i++;
                            sounds.length <= i && resolve(true);
                        };
                        return value;
                    })
            })
        }
    }, [setting, basicSound, createAudios]);

    return [soundsLoad, basicSound, (setting.sound === 'ru' ? preparationRuObj : preparationEnObj)];
};