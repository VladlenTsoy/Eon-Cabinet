import React from 'react';
import {Modal} from "antd";
import {DeleteOutlined, ExclamationCircleOutlined} from "@ant-design/icons";
import {NavigationButton} from "lib/components";
import {useDispatch, useSelector} from "react-redux";
import {deleteStudents} from "../../../../../../../../store/access/teacher/students/deleteStudents";
import {studentsSelector} from "../../../../../../../../store/access/teacher/students/studentsSlice";

const {confirm} = Modal;

const DeleteStudentButton: React.FC = () => {
    const dispatch = useDispatch();
    const {selectedIds} = useSelector(studentsSelector);

    const deleteUsers = () => {
        confirm({
            icon: <ExclamationCircleOutlined />,
            title: 'Вы действительно хотите удалить учеников?',
            okText: 'Да',
            okType: 'danger',
            async onOk() {
                await dispatch(deleteStudents(selectedIds));
            },
        });
    };

    return <NavigationButton
        type="primary"
        danger
        disabled={!selectedIds.length}
        onClick={deleteUsers}
        icon={<DeleteOutlined/>}>
        Удалить
    </NavigationButton>;
};

export default DeleteStudentButton;