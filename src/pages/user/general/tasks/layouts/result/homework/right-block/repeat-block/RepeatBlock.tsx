import React from 'react';
import {Card} from "lib/ui";
import {Button} from "antd";
import {HistoryOutlined} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import {clearGame, refreshGame} from "store/common/game/gameSplice";
import {useParams} from "react-router-dom";
import {ResultMatchProps} from "../../Result";

interface RepeatBlockProps {
    isView?: boolean;
}

const RepeatBlock: React.FC<RepeatBlockProps> = ({isView}) => {
    const {homeworkId} = useParams<ResultMatchProps>();
    const dispatch = useDispatch();

    const repeatHandler = () => {
        if (isView) {
            dispatch(clearGame());
        } else
            dispatch(refreshGame());
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