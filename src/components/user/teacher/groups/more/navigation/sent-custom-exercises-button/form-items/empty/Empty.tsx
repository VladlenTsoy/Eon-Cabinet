import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {appChangeDataForSending} from "../../../../../../../../../store/app/actions";
import {DescriptionTitle} from "../../../../../../../../../layouts/components";
import {Button, Empty} from "antd";
import {FileAddOutlined} from '@ant-design/icons';
import {useHistory} from "react-router-dom";

const ExercisesEmpty: React.FC = () => {
    const history = useHistory();
    const {language} = useSelector((state: any) => state);
    const dispatch = useDispatch();

    const createHomeworkHandler = async () => {
        await dispatch(appChangeDataForSending({isVisibleCustomExercises: true}));
        history.push('/settings/custom-exercises/create');
    };

    return <Empty description={
        <>
            <DescriptionTitle>{language.common.empty}</DescriptionTitle>
            <span>Создайте свои примеры для того, чтобы отправить.</span>
        </>
    }>
        <Button
            type="ghost"
            icon={<FileAddOutlined/>}
            size="large"
            onClick={createHomeworkHandler}
        >
            Создать свои примеры
        </Button>
    </Empty>
};

export default ExercisesEmpty;