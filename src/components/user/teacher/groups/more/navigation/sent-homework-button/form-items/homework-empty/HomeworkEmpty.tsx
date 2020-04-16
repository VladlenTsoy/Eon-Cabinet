import React from 'react';
import { FileAddOutlined } from '@ant-design/icons';
import {Empty, Button} from "antd";
import {withRouter, RouteComponentProps} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {DescriptionTitle} from "../../../../../../../../../layouts/components";
import {appChangeDataForSending} from "../../../../../../../../../store/app/actions";

const HomeworkEmpty: React.FC<RouteComponentProps> = ({history}) => {
    const {language} = useSelector((state: any) => state);
    const dispatch = useDispatch();

    const createHomeworkHandler = async () => {
        await dispatch(appChangeDataForSending({isSaved: true}));
        history.push('/homework/create');
    };

    return (
        <Empty description={
            <>
                <DescriptionTitle>{language.common.empty}</DescriptionTitle>
                <span>Создайте домашнее задание для того, чтобы отправить.</span>
            </>
        }>
            <Button
                type="ghost"
                icon={<FileAddOutlined />}
                size="large"
                onClick={createHomeworkHandler}
            >
                Создать домащнее задание
            </Button>
        </Empty>
    );
};

export default React.memo(withRouter(HomeworkEmpty));