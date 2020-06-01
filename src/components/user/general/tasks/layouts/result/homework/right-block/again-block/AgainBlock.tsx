import React from 'react';
import {Button} from "antd";
import {Card} from "lib";
import {RedoOutlined} from '@ant-design/icons';
import {clearGame, changeTotals} from "store/reducers/common/game/gameSplice";
import {useDispatch} from "react-redux";

const AgainBlock = () => {
    const dispatch = useDispatch();

    const againHandler = () =>{
        dispatch(changeTotals([]));
        dispatch(clearGame());
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