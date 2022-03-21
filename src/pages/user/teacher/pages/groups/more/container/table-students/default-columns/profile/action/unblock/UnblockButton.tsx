import React from 'react';
import {UnlockFilled} from '@ant-design/icons';
import {confirm} from "lib/ui";
import {useDispatch} from "react-redux";
import {unblockStudent} from "store/students/unblockStudent";

interface UnblockButtonProps {
    student: any;
}

const UnblockButton: React.FC<UnblockButtonProps> = ({student}) => {
    const dispatch = useDispatch();

    const clickHandler = () => {
        confirm({
            title: `Разблокировать (${student.first_name} ${student.last_name})?`,
            // content: `Ученику (${student.first_name} ${student.last_name}) будет
            // заблокирован доступ к его личному кабинету,
            //  разблокировать возможно только после 20 дней или оплаты.`,
            onOk: async () => {
                await dispatch(unblockStudent({studentId: student.id}))
            },
            okText: 'Да',
            cancelText: 'Нет',
        });
    };

    return <div onClick={clickHandler}>
        <UnlockFilled/>Разблокировать
    </div>
};
export default UnblockButton;
