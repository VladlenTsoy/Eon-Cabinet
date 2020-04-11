import {useCallback, useEffect, useState} from "react";

interface FHProps {
    [key: string]: HTMLAudioElement;
}

interface FunctionHook {
    (soundFiles: FHProps, context?: any): [boolean, FHProps];
}

export const usePreloadSounds:FunctionHook = (soundFiles) => {
    const [soundsLoading, setSoundsLoading] = useState(true);
    const [sounds] = useState(soundFiles);

    const onloadSounds = useCallback((i = 0) => {
        new Promise((resolve: any) => {
            Object.values(sounds).map((value: HTMLAudioElement) => {
                value.oncanplaythrough = () => {
                    i++;
                    if (Object.keys(sounds).length <= i)
                        resolve(true);
                };
                return value;
            })
        }).then(() => {
            setSoundsLoading(false);
        });
    }, [sounds]);

    useEffect(() => {
        onloadSounds()
    }, [onloadSounds]);

    return [soundsLoading, sounds];
};