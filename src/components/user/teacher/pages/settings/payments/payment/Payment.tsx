import React from 'react';
import { ClockCircleOutlined, HistoryOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { Tabs } from "antd";
import {Card} from "lib";
import {Alert, TabTitleCustom} from "../../../../../../../lib";
import styled from "styled-components";
import Students from "./students/Students";
import Account from "./account/Account";
import Total from "./total/Total";

const {TabPane} = Tabs;

const AlertWrapper = styled(Alert)`
  &.ant-alert-with-description{
    margin: 0;
  
    b {
      color: #fff;
    }
  }
`;

interface PaymentProps {

}

const Payment:React.FC<PaymentProps> = () => {
    return (
        <Card>
            <AlertWrapper
                showIcon
                icon={<ClockCircleOutlined />}
                type="success"
                message="Тестовый период"
                description={<>Вам предоставлен тестовый период. Осталось <b>25</b> дней.</>}
            />
            <Tabs
                defaultActiveKey="1"
                size="large"
            >
                <TabPane
                    key="1"
                    tab={
                        <TabTitleCustom>
                            <UserOutlined /> Мои данные
                        </TabTitleCustom>
                    }
                >
                    <Account/>
                </TabPane>
                <TabPane
                    key="2"
                    tab={
                        <TabTitleCustom>
                            <TeamOutlined /> Ученики
                        </TabTitleCustom>
                    }
                >
                    <Students/>
                </TabPane>
                <TabPane
                    key="3"
                    tab={
                        <TabTitleCustom>
                            <HistoryOutlined /> История платежей
                        </TabTitleCustom>
                    }
                >
                </TabPane>
            </Tabs>
            <Total/>
        </Card>
    );
};

export default Payment;