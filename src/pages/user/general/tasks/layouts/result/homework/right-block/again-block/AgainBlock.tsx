import React from 'react';
import {Card, Button} from "lib/ui";
import {RedoOutlined} from '@ant-design/icons';
import {clearGame} from "store/game/gameSplice";
import {useDispatch} from "react-redux";

const AgainBlock = () => {
    const dispatch = useDispatch();

    const againHandler = () =>{
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
