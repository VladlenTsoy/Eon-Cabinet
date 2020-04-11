import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {gameChangeTotals} from "../../../../../../../store/game/actions";
import {LoadingBlock} from "lib";
import BasicApplication from "./basic-application/BasicApplication";

const Application: React.FC = () => {
    const {game, api} = useSelector((state: any) => state);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const {setting} = game;

    const fetch = useCallback(async (): Promise<any> => {
        setLoading(true);

        let response = await api.user_general.post('/task/master-system', setting);
        let _totals = response.data.map((exercise: any) => ({exercise}));
        await dispatch(gameChangeTotals(_totals));

        setLoading(false);
    }, [dispatch, setting, api.user_general]);

    useEffect(() => {
        (async () => {
            await fetch();
        })();
    }, [fetch]);

    return loading ?
        <LoadingBlock/> :
        <BasicApplication/>;
};

export default Application;