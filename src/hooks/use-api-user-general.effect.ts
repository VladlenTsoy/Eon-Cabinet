import {useCallback, useEffect, useMemo, useState} from "react";
import axios from "axios";

const CancelToken = axios.CancelToken;

type FH<P = {}> = FunctionHook<P>;

interface FunctionHook<P = {}> {
    (props: FHProps<P>, context?: any): [boolean, any, any, any];
}

type FHProps<P> = {
    url: string;
    cancel?: boolean;
    method?: 'get' | 'post';
    config?: any;
    initValue?: any;
    afterRequest?: (data: any, params?: any) => void;
    access?: 'user'| 'guest';
}

// TODO - api
export const useApiUserGeneral: FH = (
    {
        url,
        cancel,
        method = 'get',
        config = {},
        initValue,
        afterRequest,
        access = 'user'
    }
) => {
    const [configuration] = useState<any>(config);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>();
    const [data, setData] = useState(initValue);
    const source = useMemo(() => CancelToken.source(), []);

    const fetch = useCallback((params?) => {
    }, [method, access, url, configuration, source.token]);

    useEffect(() => {
        if (!cancel) {
            fetch();
            return () => {
                source.cancel();
            }
        } else
            setLoading(false);
    }, [fetch, source, cancel]);

    return [loading, data, error, fetch];
};