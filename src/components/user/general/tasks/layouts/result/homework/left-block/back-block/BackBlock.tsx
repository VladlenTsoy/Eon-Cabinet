import React from 'react';
import {Card} from "lib";
import {Button} from "antd";
import {ArrowLeftOutlined} from '@ant-design/icons';
import {useHistory, useRouteMatch} from 'react-router-dom';
import {ResultMatchProps} from "../../Result";

const BackBlock = () => {
    const history = useHistory();
    const {params} = useRouteMatch<ResultMatchProps>();

    // todo - не работает
    const back = () => params.homeworkId ?
        history.replace(`/homework/${params.homeworkId}`) :
        history.goBack();

    return <Card className="info">
        <p>Результат сохранен, вы можете вернуться к настройкам упражнения.</p>
        <Button
            type="dashed"
            icon={<ArrowLeftOutlined/>}
            size="large"
            block
            onClick={back}
        >
            Вернуться к настройкам
        </Button>
    </Card>;
};

export default React.memo(BackBlock);