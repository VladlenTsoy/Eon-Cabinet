import React from 'react';
import { LockOutlined } from '@ant-design/icons';
import {warning} from "../../../../../../../../../../../../utils/confirm"

interface TagNotifyButtonProps {
    student: any;
}

const TagNotifyButton: React.FC<TagNotifyButtonProps> = ({student}) => {
    const clickHandler = async () => {
        await warning({
            title: `До разблокировки осталось ${student.day_block} дней!`,
            content: 'Разблокировать ученика вы сможете после 20 дней блокировки или после оплаты.',
            okText: 'Ок'
        });
    };

    return <div onClick={clickHandler}>
        <LockOutlined/> Осталось {student.day_block} д.
    </div>
};

export default TagNotifyButton;