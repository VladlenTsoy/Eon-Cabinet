import React from 'react';
import {Modal} from "antd";
import {useDispatch} from "react-redux";
import {deleteStudent} from "../../../../../../../../../store/access/teacher/students/details/deleteStudent";
import {Student} from "../../../../../../../../../store/access/teacher/students/studentsSlice";

const {confirm} = Modal;

interface DeleteButtonProps {
    student: Student;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({student, children}) => {
    const dispatch = useDispatch()

    const deleteUsers = () => {
        confirm({
            title: `Вы действительно хотите удалить прользователя (${student.first_name} ${student.last_name})?`,
            okText: 'Да',
            okType: 'danger',
            async onOk() {
                dispatch(deleteStudent(student.id))
            },
        });
    };

    return <div onClick={deleteUsers}>
        {children}
    </div>;
};

export default DeleteButton;