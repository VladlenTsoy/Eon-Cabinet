import React from 'react';
import {Col, Row} from "antd";
import Services from "./services/Services";
import Payment from "./payment/Payment";

const Payments: React.FC = () => {
    return <Row gutter={15}>
        <Col xl={8}>
            <Services/>
        </Col>
        <Col xl={16}>
            <Payment/>
        </Col>
    </Row>;
};

export default Payments;