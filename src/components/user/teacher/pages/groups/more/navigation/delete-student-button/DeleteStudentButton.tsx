import React from 'react';
import {Modal} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import {useAppContext} from "store/context/use-app-context";
import {NavigationButton} from "layouts/components";

const {confirm} = Modal;

interface DeleteStudentButtonProps {
    fetch: any;
    selectUsersId: any;
}

const DeleteStudentButton: React.FC<DeleteStudentButtonProps> = ({fetch, selectUsersId}) => {
    const {api} = useAppContext();

    const deleteUsers = () => {
        confirm({
            title: 'Вы действительно хотите удалить учеников?',
            okText: 'Да',
            okType: 'danger',
            async onOk() {
                for (const id of selectUsersId)
                    await api.user.delete(`teacher/student/${id}`);
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