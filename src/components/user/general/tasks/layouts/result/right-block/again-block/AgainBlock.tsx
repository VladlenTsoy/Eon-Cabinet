import React from 'react';
import {Button} from "antd";
import {Card} from "lib";
import {RedoOutlined} from '@ant-design/icons';

const AgainBlock = () => {
    return <Card className="info">
        <div className="title">Новые примеры</div>
        <div className="container">
            <div className="icon">
                <RedoOutlined/>
            </div>
            <div className="content">
                Сгенрировать новый примеры со старыми настройками
            </div>
        </div>
        <Button icon={<RedoOutlined/>} size="large" block>Повторить с новыми примерами</Button>
    </Card>;
};

export default AgainBlock;