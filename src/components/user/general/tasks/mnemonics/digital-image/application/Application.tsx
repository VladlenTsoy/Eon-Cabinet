import React, {useCallback} from 'react';
import {useSelector} from "react-redux";
import {settingAnzan} from "../../../../../../../store/tasks/setting/reducer";
import ApplicationLayout from "../../../layouts/application/Application.layout";
import CarouselItem from "./carousel-item/CarouselItem";

const Application: React.FC = () => {
    let setting = useSelector(settingAnzan);

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