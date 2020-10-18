import React from 'react';
import { FileAddOutlined } from '@ant-design/icons';
import {Empty as EmptyAntd} from "antd";
import {withRouter, RouteComponentProps} from "react-router-dom";
import {useDispatch} from "react-redux";
import {DescriptionTitle, Button} from "lib/ui";
import {changeIsSaved} from "store/access/teacher/group/groupSlice";
import {useLanguage} from "hooks/use-language";

const Empty: React.FC<RouteComponentProps> = ({history}) => {
    const {l} = useLanguage()
    const dispatch = useDispatch()

    const createHomeworkHandler = async () => {
        dispatch(changeIsSaved(true));
        history.push('/homework/create');
    };

    return (
        <EmptyAntd description={
            <>
                <DescriptionTitle>{l('empty')}</DescriptionTitle>
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
        </EmptyAntd>
    );
};

export default React.memo(withRouter(Empty));