import React from 'react';
import {Card} from "lib";
import {Button} from "antd";
import {HistoryOutlined} from "@ant-design/icons";

interface RepeatBlockProps {

}

const RepeatBlock: React.FC<RepeatBlockProps> = () => {
    return <Card className="info">
        <div className="title">Новые примеры</div>
        <div className="container">
            <div className="icon">
                <HistoryOutlined/>
            </div>
            <div className="content">

            </div>
        </div>
        <Button icon={<HistoryOutlined/>} size="large" block>Повторить те же примеры</Button>
    </Card>
};

export default React.memo(RepeatBlock);