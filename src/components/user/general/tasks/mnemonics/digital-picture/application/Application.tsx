import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {usePreloadPictures} from "../../../../../../../effects/use-preload-pictures.effect";
import {gameChangeTotals} from "../../../../../../../store/game/actions";
import {LoadingBlock} from "lib";
import BasicApplication from "./basic-application/BasicApplication";
import PreparationLayout from "../../../layouts/application/preparation/Preparation.layout";

const Application: React.FC = () => {
    const {game, api} = useSelector((state: any) => state);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    const [numberOfDownloaded, preloadImage] = usePreloadPictures();
    const {setting, status} = game;

    const fetch = useCallback(async (): Promise<any> => {
        setLoading(true);

        let response = await api.user_general.post('/task/digital-picture', setting);
        await preloadImage(response.data.map((exercise: any) => exercise.url_picture));

        let _totals = response.data.map((exercise: any) => ({exercise}));
        await dispatch(gameChangeTotals(_totals));

        setLoading(false);
    }, [dispatch, setting, api.user_general, preloadImage]);

    useEffect(() => {
        (async () => {
            if (status !== 'refresh' && status !== 'repeat' && status !== 'answer' && status !== 'intermediate')
                await fetch();
        })();
    }, [fetch, status]);


    return loading ?
        <LoadingBlock title={`Загруженно ${numberOfDownloaded} из ${setting.count}`}/> :
        <PreparationLayout>
            <BasicApplication/>
        </PreparationLayout>;
};

export default Application;