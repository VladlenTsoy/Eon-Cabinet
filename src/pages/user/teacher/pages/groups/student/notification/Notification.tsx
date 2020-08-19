import React from 'react';
import {Alert} from "../../../../../../../lib/ui";
import { LockOutlined } from '@ant-design/icons';
import { Col } from "antd";

interface NotificationProps {
    student: any;
}

const Notification: React.FC<NotificationProps> = ({student}) => {
    return (
        <Col span={24}>
            {student.is_blocked ? <Alert
                showIcon
                type="warning"
                icon={<LockOutlined />}
                message="Ученик заблокирован!"
                description={`До разблокировки осталось ${student.day_block} дней.`}
            /> : null}
            {/*<Alert*/}
            {/*    type="error"*/}
            {/*    showIcon*/}
            {/*    icon={<Icon type="lock"/>}*/}
            {/*    message="Ученик заблокирован!"*/}
            {/*    description="Ученик заблокирован, для активизации ученика необходимо произвести оплату!"*/}
            {/*/>*/}
        </Col>
    );
};

export default Notification;