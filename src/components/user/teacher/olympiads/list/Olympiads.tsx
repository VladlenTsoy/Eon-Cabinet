import React from 'react';
import {Col, Row} from "antd";
import {Navigation, NavigationButton} from "../../../../../layouts/components";
import {Link} from "react-router-dom";
import {PlusOutlined} from "@ant-design/icons";
import CurrentOlympiads from "./current/CurrentOlympiads";
import FutureOlympiads from "./future-olympiads/FutureOlympiads";
import PastOlympiads from "./past-olympiads/PastOlympiads";

const Olympiads = () => {
    return <>
        <Navigation>
            <Link to="/olympiad/create">
                <NavigationButton type="primary" icon={<PlusOutlined/>}>
                    Создать олимпиаду
                </NavigationButton>
            </Link>
        </Navigation>
        <Row  align="middle" gutter={15}>
            <Col xl={18} xs={24}>
                <CurrentOlympiads/>
            </Col>
            <Col xl={6} xs={24}>
                <PastOlympiads/>
            </Col>
            <Col xl={24} xs={24}>
                <FutureOlympiads/>
            </Col>
        </Row>
    </>;
};

export default Olympiads;