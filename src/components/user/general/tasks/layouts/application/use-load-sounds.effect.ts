import {useCallback, useState} from "react";

const BasicSound = require('assets/sounds/anzan.ogg');

interface Props{
    setting: any;
}

type ReturnType = [() => Promise<any>, HTMLAudioElement];

type LoadSoundTypes = (props: Props) => ReturnType;

export const useLoadSoundsEffect:LoadSoundTypes = ({setting}) => {
    const [basicSound] = useState<HTMLAudioElement>(new Audio(BasicSound));

    const soundsLoad = useCallback(async () => {
        if (setting.sound === 'basic')
            return await new Promise((resolve) => {
                if (basicSound.readyState < 2)
                    basicSound.oncanplaythrough = () => resolve(true);
                else
                    resolve(true);
            });
    }, [setting, basicSound]);

    return [soundsLoad, basicSound];
};