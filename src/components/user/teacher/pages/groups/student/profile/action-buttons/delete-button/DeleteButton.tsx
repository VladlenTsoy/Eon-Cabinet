import React from 'react';
import {useSelector} from "react-redux";
import {Modal} from "antd";

const {confirm} = Modal;

interface DeleteButtonProps {
    student: any;
    fetch: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({student, fetch, children}) => {
    const {api} = useSelector((state: any) => state);

    const deleteUsers = () => {
        confirm({
            title: `Вы действительно хотите удалить прользователя (${student.first_name} ${student.last_name})?`,
            okText: 'Да',
            okType: 'danger',
            async onOk() {
                await api.user_general.delete(`teacher/student/${student.id}`);
                await fetch();
            },
        });
    };

    return <div onClick={deleteUsers}>
        {children}
    </div>;
};

export default DeleteButton;