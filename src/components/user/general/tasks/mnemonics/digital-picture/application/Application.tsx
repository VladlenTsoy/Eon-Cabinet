import React, {useCallback} from 'react';
import {useSelector} from "react-redux";
import {settingAnzan} from "../../../../../../../store/reducers/common/tasks/setting/reducer";
import ApplicationLayout from "../../../layouts/application/Application.layout";
import Custom from "./custom/Custom";

const Application: React.FC = () => {
    let setting = useSelector(settingAnzan);

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