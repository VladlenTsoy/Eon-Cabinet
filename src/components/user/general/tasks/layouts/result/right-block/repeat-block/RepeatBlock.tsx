import React from 'react';
import {Card} from "lib";
import {Button} from "antd";
import {HistoryOutlined} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import {
    gameChangeCurrentTimes,
    gameChangeExecutionMode, gameChangeStats,
    gameChangeStatus
} from "store/game/actions";

const RepeatBlock: React.FC = () => {
    const dispatch = useDispatch();

    const repeatHandler = () => {
        dispatch(gameChangeCurrentTimes(1));
        dispatch(gameChangeStats({all: 0, success: 0}));
        dispatch(gameChangeExecutionMode('repeat'));
        dispatch(gameChangeStatus('start'));
    };

    return <Card className="info">
        <div className="title">Текущие примеры</div>
        <div className="container">
            <div className="icon">
                <HistoryOutlined/>
            </div>
            <div className="content">
                Текущие примеры повторить
            </div>
        </div>
        <Button icon={<HistoryOutlined/>} size="large"
                block onClick={repeatHandler}>
            Повторить те же примеры
        </Button>
    </Card>
};

export default React.memo(RepeatBlock);