import {useCallback, useEffect, useState} from "react";

export const useAddTimeout = () => {
    const [stateTimeout, setStateTimeout] = useState<any[]>([]);

    // Clear Timeouts
    useEffect(() => () => {
        stateTimeout.map((timeout: any) => clearTimeout(timeout))
    }, [stateTimeout]);


    // Add Timeout to array
    const addTimeout = useCallback((arrayTimeouts: any) =>
        setStateTimeout((prevState) => [...prevState, ...arrayTimeouts]), []);

    return [addTimeout];
};