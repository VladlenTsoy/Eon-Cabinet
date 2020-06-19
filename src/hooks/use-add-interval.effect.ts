import {useCallback, useEffect, useState} from "react";

export const useAddInternal = () => {
    const [stateInterval, setStateInterval] = useState<any[]>([]);

    // Add Interval to array
    const addInterval = useCallback(
        (interval: any, time: number) => {
            const _interval = setInterval(interval, time);
            setStateInterval((prevState) => [...prevState, _interval]);
            return _interval;
        },
        []
    );

    // Clear Interval exercise
    useEffect(() => () => {
        stateInterval.map((interval: any) => clearInterval(interval));
    }, [stateInterval]);

    return [addInterval];
};