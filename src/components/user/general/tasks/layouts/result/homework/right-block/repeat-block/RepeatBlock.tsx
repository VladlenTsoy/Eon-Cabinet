import React from 'react';
import {Card} from "lib";
import {Button} from "antd";
import {HistoryOutlined} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import {
    gameChangeCurrentTimes,
    gameChangeExecutionMode, gameChangeStats,
    gameChangeStatus
} from "store/reducers/common/game/actions";
import {useParams} from "react-router-dom";
import {ResultMatchProps} from "../../Result";
import {totalsChange} from "../../../../../../../../../store/tasks/totals/action";

interface RepeatBlockProps {
    isView?: boolean;
}

const RepeatBlock: React.FC<RepeatBlockProps> = ({isView}) => {
    const {homeworkId} = useParams<ResultMatchProps>();
    const dispatch = useDispatch();

    const repeatHandler = () => {
        dispatch(gameChangeCurrentTimes(0));
        dispatch(gameChangeStats({all: 0, success: 0}));
        dispatch(gameChangeStatus('start'));
        if (isView) {
            dispatch(totalsChange([]));
            dispatch(gameChangeExecutionMode('first'));
        } else
            dispatch(gameChangeExecutionMode('repeat'));
    };

    return <Card className="info">
        <div className="title">Текущее упражнение</div>
        <div className="container">
            <div className="icon">
                <HistoryOutlined/>
            </div>
            <div className="content">
                {homeworkId ? 'Не повезло, попробуй еще раз!' : 'Повторить упражнение с текущими примерами'}
            </div>
        </div>
        <Button icon={<HistoryOutlined/>} size="large"
                block onClick={repeatHandler}>
            Повторить упражнение
        </Button>
    </Card>
};

export default React.memo(RepeatBlock);