import {useCallback, useEffect, useMemo, useState} from "react";
import axios from "axios";
import {useAppContext} from "../store/context/use-app-context";

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
    const {api} = useAppContext();
    const [configuration] = useState<any>(config);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>();
    const [data, setData] = useState(initValue);
    const source = useMemo(() => CancelToken.source(), []);

    const fetch = useCallback((params?) => {
        setLoading(true);
        (
            method === 'post' ?
                api[access].post(url, configuration.params, {
                    ...configuration,
                    ...params ? {params} : {},
                    cancelToken: source.token
                }) :
                api[access].get(url, {
                    ...configuration,
                    ...params ? {params} : {},
                    cancelToken: source.token
                })
        )
            .then(async (response: any) => {
                setData(response.data);

                if (afterRequest)
                    await afterRequest(response.data, params || configuration.params);

                setLoading(false);
            }).catch((thrown: any) => {
            if (axios.isCancel(thrown)) {
                // console.log('Request canceled', thrown.message);
            } else {
                setError(thrown && thrown.response ? thrown.response.data : thrown);
                setLoading(false);
            }
        });
    }, [method, api, access, url, configuration, source.token, afterRequest]);

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