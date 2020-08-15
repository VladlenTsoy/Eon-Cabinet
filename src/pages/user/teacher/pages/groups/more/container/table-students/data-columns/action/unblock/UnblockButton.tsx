import React from 'react';
import {UnlockOutlined} from '@ant-design/icons';
import {Button, Modal} from "antd";
import {useDispatch} from "react-redux";
import {unblockStudent} from "../../../../../../../../../../../store/access/teacher/students/details/unblockStudent";

interface UnblockButtonProps {
    student: any;
    fetch: () => void;
}

const UnblockButton: React.FC<UnblockButtonProps> = ({student}) => {
    const dispatch = useDispatch();

    const clickHandler = () => {
        Modal.confirm({
            title: `Разблокировать (${student.first_name} ${student.last_name})?`,
            // content: `Ученику (${student.first_name} ${student.last_name}) будет
            // заблокирован доступ к его личному кабинету,
            //  разблокировать возможно только после 20 дней или оплаты.`,
            onOk: async () => {
                await dispatch(unblockStudent({studentId: student.id}))
            }
        });
    };

    return <Button shape="circle" icon={<UnlockOutlined/>} size="large" onClick={clickHandler}/>;
};
export default UnblockButton;