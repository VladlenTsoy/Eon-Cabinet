import React, {useCallback} from 'react';
import {useSelector} from "react-redux";
import {settingAnzan} from "../../../../../../../store/tasks/setting/reducer";
import ApplicationLayout from "../../../layouts/application/Application.layout";
import CarouselItem from "./carousel-item/CarouselItem";

const Application: React.FC = () => {
    let setting = useSelector(settingAnzan);

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