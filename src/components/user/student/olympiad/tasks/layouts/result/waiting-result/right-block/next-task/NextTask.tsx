import React from 'react';
import {Card, GrayIcon, LoadingBlock} from "lib";
import TaskSuccessSVG from "assets/images/olympiad/task_success.svg";
import { FlagOutlined } from '@ant-design/icons';
import {Button} from "antd";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {
    gameChangeCurrentTimes,
    gameChangeStatus,
} from "../../../../../../../../../../store/game/actions";
import {useDispatch} from "react-redux";

interface RouteProps {
    sentOlympiadId: string,
    taskOlympiadId: string
    taskId: string
}

type NextStepProps = RouteComponentProps<RouteProps> & {
    loading: boolean;
    nextTask: any;
}

const NextTask: React.FC<NextStepProps> = ({loading, nextTask, history, match}) => {
    const dispatch = useDispatch();

    const nextTaskStart = () => {
        history.push(`/olympiads/${match.params.sentOlympiadId}/${nextTask.id}/${nextTask.task_id}`);
        // dispatch(gameChangeSetting(nextTask.settings));
        // dispatch(gameChangeTotals([]));
        dispatch(gameChangeCurrentTimes(1));
        dispatch(gameChangeStatus('start'));
    };

    return (
        <Card className="info">
            <div className="title">Следующее упражнение</div>
            <div className="container">
                <GrayIcon img={TaskSuccessSVG} alt="Звезда" percent={0} width={'100%'}/>
                {
                    loading ?
                        <LoadingBlock title={null}/> :
                        <div className="content">
                            {nextTask.task_name} ({nextTask.count_all})
                        </div>
                }
            </div>
            <Button block icon={<FlagOutlined />} size="large" loading={loading} onClick={nextTaskStart}>Начать упражнение</Button>
        </Card>
    );
};

export default withRouter(React.memo(NextTask));