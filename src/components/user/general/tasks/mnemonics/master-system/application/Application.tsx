import React from 'react';
import {useSelector} from "react-redux";
import {settingAnzan} from "../../../../../../../store/tasks/setting/reducer";
import ApplicationLayout from "../../../layouts/application/Application.layout";
import CarouselItem from "./carousel-item/CarouselItem";

const Application: React.FC = () => {
    let setting = useSelector(settingAnzan);
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