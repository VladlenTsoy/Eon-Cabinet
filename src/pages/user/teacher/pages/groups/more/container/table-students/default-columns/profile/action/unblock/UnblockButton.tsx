import React from 'react';
import {UnlockFilled} from '@ant-design/icons';
import {Modal} from "antd";
import {useDispatch} from "react-redux";
import {unblockStudent} from "store/access/teacher/students/unblockStudent";

interface UnblockButtonProps {
    student: any;
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

    return <div onClick={clickHandler}>
        <UnlockFilled/>Разблокировать
    </div>
};
export default UnblockButton;