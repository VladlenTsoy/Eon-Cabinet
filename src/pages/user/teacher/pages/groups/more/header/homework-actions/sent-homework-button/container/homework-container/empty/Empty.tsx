import React from 'react';
import { FileAddOutlined } from '@ant-design/icons';
import {withRouter, RouteComponentProps} from "react-router-dom";
import {useDispatch} from "react-redux";
import {Empty as EmptyLib, Button} from "lib/ui";
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
        <EmptyLib
            title={l('empty')}
            description={"Создайте домашнее задание для того, чтобы отправить."}>
            <Button
                type="ghost"
                icon={<FileAddOutlined />}
                size="large"
                onClick={createHomeworkHandler}
            >
                Создать домащнее задание
            </Button>
        </EmptyLib>
    );
};

export default React.memo(withRouter(Empty));