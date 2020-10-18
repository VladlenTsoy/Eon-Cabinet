import React from 'react';
import {Card, Button} from "lib/ui";
import {ArrowLeftOutlined} from '@ant-design/icons';
import {useHistory, useParams} from 'react-router-dom';
import {ResultMatchProps} from "../../Result";

const BackBlock = () => {
    const {homeworkId} = useParams<ResultMatchProps>();
    const history = useHistory();
    const back = () => history.goBack();

    return <Card className="info">
        <p>
            {
                homeworkId ?
                    'Результат сохранен, вы можете вернуться к списку упражнений' :
                    'Результат сохранен, вы можете вернуться к настройкам упражнения.'
            }
        </p>
        <Button
            type="dashed"
            icon={<ArrowLeftOutlined/>}
            size="large"
            block
            onClick={back}
        >
            {homeworkId ? 'Вернуться к списку' : 'Вернуться к настройкам'}
        </Button>
    </Card>;
};

export default React.memo(BackBlock);