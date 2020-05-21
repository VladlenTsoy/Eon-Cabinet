import React from 'react';
import {Modal} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import {useSelector} from "react-redux";
import {NavigationButton} from "layouts/components";

const {confirm} = Modal;

interface DeleteStudentButtonProps {
    fetch: any;
    selectUsersId: any;
}

const DeleteStudentButton: React.FC<DeleteStudentButtonProps> = ({fetch, selectUsersId}) => {
    const {api} = useSelector((state: any) => state);

    const deleteUsers = () => {
        confirm({
            title: 'Вы действительно хотите удалить учеников?',
            okText: 'Да',
            okType: 'danger',
            async onOk() {
                for (const id of selectUsersId)
                    await api.user_general.delete(`teacher/student/${id}`);
                await fetch();
            },
        });
    };

    return <NavigationButton
        type="primary"
        danger
        disabled={!selectUsersId.length}
        onClick={deleteUsers}
        icon={<DeleteOutlined/>}>
        Удалить
    </NavigationButton>;
};

export default DeleteStudentButton;