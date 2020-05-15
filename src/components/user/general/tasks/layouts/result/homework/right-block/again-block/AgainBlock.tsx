import React from 'react';
import {Button} from "antd";
import {Card} from "lib";
import {RedoOutlined} from '@ant-design/icons';
import {
    gameChangeCurrentTimes,
    gameChangeExecutionMode, gameChangeStats,
    gameChangeStatus
} from "store/game/actions";
import {useDispatch} from "react-redux";
import {totalsChange} from "../../../../../../../../../store/tasks/totals/action";

const AgainBlock = () => {
    const dispatch = useDispatch();

    const againHandler = () =>{
        dispatch(gameChangeCurrentTimes(0));
        dispatch(totalsChange([]));
        dispatch(gameChangeStats({all: 0, success: 0}));
        dispatch(gameChangeExecutionMode('first'));
        dispatch(gameChangeStatus('start'));
    };

    return <Card className="info">
        <div className="title">Новые примеры</div>
        <div className="container">
            <div className="icon">
                <RedoOutlined/>
            </div>
            <div className="content">
                Новые примеры с текущими настройками
            </div>
        </div>
        <Button icon={<RedoOutlined/>} size="large" block onClick={againHandler}>Повторить с новыми примерами</Button>
    </Card>;
};

export default AgainBlock;