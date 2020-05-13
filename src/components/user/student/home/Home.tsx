import React from 'react';
import {Col, Row} from "antd";
// import Rating from "./rating/Rating";
import Olympiad from "./olympiad/Olympiad";
import Homework from "./homework/Homework";
import Statistic from "./statistic/Statistic";
// import Notification from "./notification/Notification";

const Home: React.FC = () => {
    return <>
        {/*    <Notification/>*/}
        <Statistic/>
        <Homework/>
        <Row  gutter={15}>
            <Col xl={18} lg={24} md={14} xs={24}>
                <Olympiad/>
            </Col>
            <Col xl={6} lg={8} md={10} xs={24}>
                {/*<Rating/>*/}
            </Col>
        </Row>
    </>
};

export default Home;