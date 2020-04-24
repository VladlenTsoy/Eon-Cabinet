import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {usePreloadPictures} from "../../../../../../../effects/use-preload-pictures.effect";
import {LoadingBlock} from "lib";
import BasicApplication from "./basic-application/BasicApplication";
import {totalsChange} from "../../../../../../../store/tasks/totals/action";

const Application: React.FC = () => {
    const {game, api} = useSelector((state: any) => state);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const [numberOfDownloaded, preloadImage] = usePreloadPictures();
    const {setting, status} = game;

    const fetch = useCallback(async (): Promise<any> => {
        setLoading(true);

        let response = await api.user_general.post('/task/countries', setting);

        let flags = response.data.map((exercise: any) => exercise.url_flag);
        let emblems = response.data.map((exercise: any) => exercise.url_emblem);
        await preloadImage(flags.concat(emblems));

        let _totals = response.data.map((exercise: any) => ({exercise}));
        await dispatch(totalsChange(_totals));

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
        <BasicApplication/>;
};

export default Application;