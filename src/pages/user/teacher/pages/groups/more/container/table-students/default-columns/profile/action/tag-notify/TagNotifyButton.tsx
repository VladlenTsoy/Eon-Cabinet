import React from 'react';
import { LockOutlined } from '@ant-design/icons';
import {Modal} from "antd";

interface TagNotifyButtonProps {
    student: any;
}

const TagNotifyButton: React.FC<TagNotifyButtonProps> = ({student}) => {
    const clickHandler = () => {
        Modal.warning({
            title: `До разблокировки осталось ${student.day_block} дней!`,
            content: 'Разблокировать ученика вы сможете после 20 дней блокировки или после оплаты.',
        });
    };

    return <div onClick={clickHandler}>
        <LockOutlined/> Осталось {student.day_block} д.
    </div>
};

export default TagNotifyButton;