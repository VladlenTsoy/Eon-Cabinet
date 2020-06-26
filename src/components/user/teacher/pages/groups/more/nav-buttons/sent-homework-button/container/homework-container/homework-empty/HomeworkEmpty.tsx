import React from 'react';
import { FileAddOutlined } from '@ant-design/icons';
import {Empty, Button} from "antd";
import {withRouter, RouteComponentProps} from "react-router-dom";
import {useDispatch} from "react-redux";
import {DescriptionTitle} from "../../../../../../../../../../../lib";
import {changeIsSaved} from "../../../../../../../../../../../store/reducers/teacher/group/groupSlice";
import {useAppContext} from "../../../../../../../../../../../store/context/use-app-context";

const HomeworkEmpty: React.FC<RouteComponentProps> = ({history}) => {
    const {language} = useAppContext();
    const dispatch = useDispatch();

    const createHomeworkHandler = async () => {
        dispatch(changeIsSaved(true));
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