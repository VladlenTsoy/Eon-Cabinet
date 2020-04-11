import React from "react";
import {Col, Row} from "antd";
import TaskBlock from "./task/Task";

interface TabDisciplineProps {
    tasks: any;
}

const TabDiscipline: React.FC<TabDisciplineProps> = ({tasks}) => {
    return <Row  gutter={15}>
        {tasks.map((task: any) =>
            <Col xl={6} lg={8} md={8} sm={12} xs={24} key={task.id}>
                <TaskBlock task={task}/>
            </Col>
        )}
    </Row>
};

export default TabDiscipline;