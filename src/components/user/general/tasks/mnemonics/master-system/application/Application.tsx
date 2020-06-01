import React from 'react';
import {useSelector} from "react-redux";
import ApplicationLayout from "../../../layouts/application/Application.layout";
import CarouselItem from "./carousel-item/CarouselItem";
import {gameSelector} from "../../../../../../../store/reducers/common/game/gameSplice";

const Application: React.FC = () => {
    const {setting} = useSelector(gameSelector);

    return <ApplicationLayout
        timer
        setting={setting}
        displayType="carousel"
        requestSetting={{
            url: '/task/master-system',
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