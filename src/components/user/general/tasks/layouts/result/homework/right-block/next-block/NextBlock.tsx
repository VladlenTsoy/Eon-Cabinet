import React from 'react';
import {useDispatch} from "react-redux";
import {clearGame} from "store/reducers/common/game/gameSplice";
import {Card, GrayIcon} from "lib";
import TaskSuccessSVG from "assets/images/olympiad/task_success.svg";
import {Button} from "antd";
import {useHistory, useParams} from "react-router-dom";
import {ResultMatchProps} from "../../Result";
import {FlagOutlined} from '@ant-design/icons';
import {settingChange} from "../../../../../../../../../store/reducers/common/tasks/setting/action";
import {totalsChange} from "../../../../../../../../../store/reducers/common/tasks/totals/action";

interface NextBlockProps {
    nextTask: any;
}

const NextBlock: React.FC<NextBlockProps> = ({nextTask}) => {
    const {homeworkId, disciplineId} = useParams<ResultMatchProps>();
    const history = useHistory();
    const dispatch = useDispatch();

    const nextTaskStart = () => {
        dispatch(settingChange(nextTask.settings));
        dispatch(totalsChange([]));
        dispatch(clearGame());
        history.replace(`/homework/${homeworkId}/${nextTask.id}/${disciplineId}/${nextTask.task_id}`);
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