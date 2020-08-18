import React from 'react';
import {Col, Row} from "antd";
import CenterCounter from "../../../director-franchise/home/center-counter/CenterCounter";
import TeacherCounter from "../../../director-franchise/home/teacher-counter/TeacherCounter";
import StudentCounter from "../../../director-franchise/home/student-counter/StudentCounter";
import TestAccountsTable from "./teachers-table/test-accounts-table/TestAccountsTable";
import InactiveAccountsTable from "./teachers-table/inactive-accounts-table/InactiveAccountsTable";

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
            <TestAccountsTable/>
        </Col>
        <Col span={24}>
            <InactiveAccountsTable/>
        </Col>
    </Row>
};

export default Home;