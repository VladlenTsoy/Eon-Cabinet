import React from 'react';
import {useDispatch} from "react-redux";
import {clearGame, changeSetting} from "store/reducers/common/game/gameSplice";
import {Card, GrayIcon} from "lib";
import TaskSuccessSVG from "assets/images/olympiad/task_success.svg";
import {Button} from "antd";
import {useHistory, useParams} from "react-router-dom";
import {ResultMatchProps} from "../../Result";
import {FlagOutlined} from '@ant-design/icons';
import {useAppContext} from "../../../../../../../../../store/context/use-app-context";

interface NextBlockProps {
    nextTask: any;
}

const NextBlock: React.FC<NextBlockProps> = ({nextTask}) => {
    const {user} = useAppContext();
    const {homeworkId, disciplineId} = useParams<ResultMatchProps>();
    const history = useHistory();
    const dispatch = useDispatch();

    const nextTaskStart = () => {
        dispatch(changeSetting(checkTaskTypeOldTask(nextTask.settings)));
        dispatch(clearGame());
        if (user)
            history.replace(`/homework/${homeworkId}/${nextTask.id}/${disciplineId}/${nextTask.task_id}`);
        else
            history.replace(`/guest/homework/${homeworkId}/${nextTask.id}/${disciplineId}/${nextTask.task_id}`);
    };

    const checkTaskTypeOldTask = (settings: any) => {
        if (settings?.task)
            switch (Number(settings?.task)) {
                case 2:
                case 4:
                    settings.anzan = 'list';
                    break;
                case 1:
                case 3:
                    settings.anzan = 'basic';
                    break;
                case 5:
                    settings.anzan = 'double';
                    break;
            }
        return settings;
    };

    return <Card className="info">
        <div className="title">Следующее упражнение</div>
        <div className="container">
            <GrayIcon img={TaskSuccessSVG} alt="Звезда" percent={0} width={'100%'}/>
            <div className="content">
                {nextTask.task_name} ({nextTask.count_all})
            </div>
        </div>
        <Button block icon={<FlagOutlined/>} size="large" onClick={nextTaskStart}>
            Начать упражнение
        </Button>
    </Card>
};

export default NextBlock;