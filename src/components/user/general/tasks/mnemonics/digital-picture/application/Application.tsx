import React, {useCallback} from 'react';
import {useSelector} from "react-redux";
import ApplicationLayout from "../../../layouts/application/Application.layout";
import Custom from "./custom/Custom";
import {gameSelector} from "../../../../../../../store/reducers/common/game/gameSplice";

const Application: React.FC = () => {
    const {setting} = useSelector(gameSelector);

    const picturesLoad = useCallback((data) => {
        return data.map((exercise: any) => exercise.url_picture);
    }, []);

    return <ApplicationLayout
        pictures={picturesLoad}
        setting={setting}
        displayType="custom"
        requestSetting={{
            url: '/task/digital-picture',
            method: 'post',
            setting,
        }}
        CustomDisplay={Custom}
        nextStatus="answer"
    />
};

export default Application;