import React from 'react';
import {Button, Card, GrayIcon, LoadingBlock} from "lib/ui";
import TaskSuccessSVG from "assets/images/olympiad/task_success.svg";
import { FlagOutlined } from '@ant-design/icons';
import {RouteComponentProps, withRouter} from "react-router-dom";
import {changeStatus, changeCurrentTimes, changeSetting, changeTotals} from "store/game/gameSplice";
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
        dispatch(changeSetting(nextTask.settings));
        dispatch(changeTotals([]));
        dispatch(changeCurrentTimes(0));
        dispatch(changeStatus('start'));
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
