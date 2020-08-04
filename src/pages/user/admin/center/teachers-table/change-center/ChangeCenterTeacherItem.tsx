import React, {useState} from 'react';
import { RetweetOutlined } from '@ant-design/icons';
import {Modal} from "../../../../../../lib/components";
import BodyChangeCenterTeacher from "./body-change-center/BodyChangeCenterTeacher";

interface ChangeCenterTeacherItemProps {
    teacher: any;
    afterAction: any;
}

const ChangeCenterTeacherItem: React.FC<ChangeCenterTeacherItemProps> = ({teacher, afterAction}) => {
    const [visible, setVisible] = useState(false);

    const close = () => setVisible(false);
    const open = () => setVisible(true);

    const afterActionClose = async () => {
        await close();
        await afterAction();
    };

    return <>
        <div onClick={open}>
            <RetweetOutlined /> Изменить центр
        </div>
        <Modal
            title={`Преместить учителя ${teacher.first_name} ${teacher.last_name} в другой центр`}
            visible={visible}
            width={750}
            onCancel={close}
        >
            <BodyChangeCenterTeacher teacher={teacher} afterAction={afterActionClose}/>
        </Modal>
    </>;
};

export default ChangeCenterTeacherItem;