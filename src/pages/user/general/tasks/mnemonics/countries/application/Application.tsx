import React, {useCallback} from 'react';
import {useSelector} from "react-redux";
import ApplicationLayout from "../../../layouts/application/Application.layout";
import CarouselItem from "./carousel-item/CarouselItem";
import {gameSelector} from "../../../../../../../store/common/game/gameSplice";

const Application: React.FC = () => {
    const {setting} = useSelector(gameSelector);

    const picturesLoad = useCallback((data) => {
        let flags = data.map((exercise: any) => exercise.url_flag);
        let emblems = data.map((exercise: any) => exercise.url_emblem);
        return flags.concat(emblems);
    }, []);

    return <ApplicationLayout
        timer
        pictures={picturesLoad}
        setting={setting}
        displayType="carousel"
        requestSetting={{
            url: '/task/countries',
            method: 'post',
            setting,
        }}
        carouselSetting={{
            item: CarouselItem,
            topNumbering: true,
        }}
        nextStatus="answer"
    />
};

export default Application;