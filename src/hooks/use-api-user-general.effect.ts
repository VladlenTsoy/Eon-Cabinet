import {useCallback, useState} from "react";

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
        initValue,
    }
) => {
    const [loading] = useState(true);
    const [error] = useState<string>();
    const [data] = useState(initValue);

    const fetch = useCallback(() => {
    }, []);

    return [loading, data, error, fetch];
};