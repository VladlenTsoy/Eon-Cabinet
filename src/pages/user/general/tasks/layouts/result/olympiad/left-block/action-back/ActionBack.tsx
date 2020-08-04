import React from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import {Button} from "antd";
import {Card} from "lib/components";
import {RouteComponentProps, withRouter} from "react-router";
import {RouteOlympiadTaskProps} from "../../Result";

type ActionBackProps = RouteComponentProps<RouteOlympiadTaskProps>;

const ActionBack:React.FC<ActionBackProps> = ({history}) => {
    const back = () => history.goBack();

    return (
        <Card className="info">
            <p>Результат сохранен, вы можете продолжить выполнение олимпиады позже.</p>
            <Button
                type="dashed"
                icon={<ArrowLeftOutlined />}
                size="large"
                block
                onClick={back}
            >
                Вернуться к списку
            </Button>
        </Card>
    );
};

export default withRouter(React.memo(ActionBack));