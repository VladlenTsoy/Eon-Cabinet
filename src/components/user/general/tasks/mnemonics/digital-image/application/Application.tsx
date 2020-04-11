import React, {useCallback, useEffect, useState} from 'react';
import {LoadingBlock} from "lib";
import BasicApplication from "./basic-application/BasicApplication";
import {usePreloadPictures} from "../../../../../../../effects/use-preload-pictures.effect";
import {useDispatch, useSelector} from "react-redux";
import {gameChangeTotals} from "../../../../../../../store/game/actions";

const Application:React.FC = () => {
    const {game, api} = useSelector((state: any) => state);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const [numberOfDownloaded, preloadImage] = usePreloadPictures();
    const {setting} = game;

    const fetch = useCallback(async (): Promise<any> => {
        setLoading(true);

        let response = await api.user_general.post('/task/digital-image', setting);
        let pictures = response.data.map((exercise: any) => exercise.url_form);
        await preloadImage(pictures);

        let _totals = response.data.map((exercise: any) => ({exercise}));
        await dispatch(gameChangeTotals(_totals));

        setLoading(false);
    }, [dispatch, setting, api.user_general, preloadImage]);

    useEffect(() => {
        (async () => {
            await fetch();
        })();
    }, [fetch]);

    return loading ?
        <LoadingBlock title={`Загруженно ${numberOfDownloaded}`}/>
        : <BasicApplication/>;
};

export default Application;