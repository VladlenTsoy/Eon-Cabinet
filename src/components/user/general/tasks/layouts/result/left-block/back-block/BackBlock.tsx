import React from 'react';
import {Card} from "../../../../../../../../lib";
import {Button} from "antd";
import {ArrowLeftOutlined} from '@ant-design/icons';
import {useHistory} from 'react-router-dom';

const BackBlock = () => {
    const history = useHistory();
    const back = () => history.goBack();

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