import React, {useCallback} from 'react';
import {useSelector} from "react-redux";
import ApplicationLayout from "../../../layouts/application/Application.layout";
import CarouselItem from "./carousel-item/CarouselItem";
import {gameSelector} from "../../../../../../../store/reducers/common/game/gameSplice";

const Application: React.FC = () => {
    const {setting} = useSelector(gameSelector);

    const picturesLoad = useCallback((data) => {
        return data.map((exercise: any) => exercise.url_form);
    }, []);

    return <ApplicationLayout
        timer
        pictures={picturesLoad}
        setting={setting}
        displayType="carousel"
        requestSetting={{
            url: '/task/digital-image',
            method: 'post',
            setting,
        }}
        carouselSetting={{
            item: CarouselItem,
        }}
        nextStatus="answer"
    />
};

export default Application;