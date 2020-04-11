import React, {useCallback, useEffect, useState} from 'react';
import {gameChangeStatus, gameChangeTotals} from "../../../../../../../store/game/actions";
import {useDispatch, useSelector} from "react-redux";
import {LoadingBlock} from "lib";
import ListApplication from "./list-application/ListApplication";
import BasicApplication from "./basic-application/BasicApplication";
import {Modal} from "antd";

const Application: React.FC = () => {
    const {game, api} = useSelector((state: any) => state);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    const {setting, status} = game;

    /**
     * Запрос слов по настройкам
     */
    const fetch = useCallback(async (): Promise<void> => {
        let data = [];
        setLoading(true);

        for (let val in setting.several)
            data.push(setting.several[val]);

        let response = await api.user_general.post('/task/words', {several: data});
        let _totals = response.data.map((exercise: any) => ({exercise}));

        await dispatch(gameChangeTotals(_totals));
    }, [dispatch, setting, api.user_general]);

    /**
     * Окончание таймера
     */
    const timeIsRunningOut = () => {
        Modal.destroyAll();
        document.onkeyup = null;
        return Modal.warning({
            title: 'Время закончилось!',
            // content: '',
            onOk() {
                dispatch(gameChangeStatus('answer'));
            }
        });
    };

    // Fetch algorithms or check totals exercise
    useEffect(() => {
        (async () => {
            if (status !== 'refresh' && status !== 'repeat' && status !== 'answer' && status !== 'intermediate')
                await fetch();
            setLoading(false);
        })();
    }, [fetch, status]);

    return loading ?
        <LoadingBlock/> : setting.mode === 'list' ?
            <ListApplication timeIsRunningOut={timeIsRunningOut}/> :
            <BasicApplication timeIsRunningOut={timeIsRunningOut}/>
};

export default Application;