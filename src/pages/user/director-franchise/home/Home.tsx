import React from 'react';
import {Col, Row} from "antd";
import CenterCounter from "./center-counter/CenterCounter";
import TeacherCounter from "./teacher-counter/TeacherCounter";
import StudentCounter from "./student-counter/StudentCounter";
import TestTeacherTable from "./test-teacher-table/TestTeacherTable";

const Home: React.FC = () => {
    return <Row  gutter={15} justify="center" align="middle">
        <Col xxl={5} xl={6} lg={8} md={12} span={24}>
            <CenterCounter/>
        </Col>
        <Col xxl={7} xl={10} lg={13} span={24}>
            <TeacherCounter/>
        </Col>
        <Col xxl={6} xl={8} lg={11} md={15} span={24}>
            <StudentCounter/>
        </Col>
        <Col span={24}>
            <TestTeacherTable/>
        </Col>
    </Row>;
};

export default Home;