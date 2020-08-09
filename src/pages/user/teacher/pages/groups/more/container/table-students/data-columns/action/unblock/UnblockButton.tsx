import React from 'react';
import {UnlockOutlined} from '@ant-design/icons';
import {Button, Modal} from "antd";

interface UnblockButtonProps {
    student: any;
    fetch: () => void;
}

// TODO - api
const UnblockButton: React.FC<UnblockButtonProps> = ({student, fetch}) => {

    const clickHandler = () => {
        Modal.confirm({
            title: `Разблокировать (${student.first_name} ${student.last_name})?`,
            // content: `Ученику (${student.first_name} ${student.last_name}) будет
            // заблокирован доступ к его личному кабинету,
            //  разблокировать возможно только после 20 дней или оплаты.`,
            onOk: async () => {
                // await api.user.post(`/${student.id}/unblock`);
                await fetch();
            }
        });
    };

    return <Button shape="circle" icon={<UnlockOutlined/>} size="large" onClick={clickHandler}/>;
};
export default UnblockButton;