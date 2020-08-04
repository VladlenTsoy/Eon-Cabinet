import React from 'react';
import {Col, Row} from "antd";
import {Card} from "lib/components";

const TaskTitleSetting:React.FC<any> = () => {
    return <Row>
        <Col xl={12}>
            <Card>
                <Card.Title level={3} title="Ментальная арифметика"/>
            </Card>
        </Col>
    </Row>;
};

export default TaskTitleSetting;