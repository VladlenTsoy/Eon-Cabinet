import React from 'react';
import { LockOutlined } from '@ant-design/icons';
import {Button, Modal} from "antd";

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

    return (
        <Button type="danger" icon={<LockOutlined />} onClick={clickHandler}>
            {student.day_block} д.
        </Button>
    );
};

export default TagNotifyButton;