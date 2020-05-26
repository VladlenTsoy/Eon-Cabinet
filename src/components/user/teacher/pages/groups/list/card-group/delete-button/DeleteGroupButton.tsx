import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { Modal, message } from "antd";
import {useAppContext} from "store/context/use-app-context";

interface DeleteGroupButtonProps {
    group: any;
    fetch: any;
}

const {confirm} = Modal;

const DeleteGroupButton: React.FC<DeleteGroupButtonProps> = ({group, fetch}) => {
    const {api} = useAppContext();
    const deleteGroup = () => {
        if (group.count === 0)
            confirm({
                title: `Вы действительно хотите удалить группу ${group.title}?`,
                okText: 'Да',
                okType: 'danger',
                cancelText: 'Нет',
                async onOk() {
                    try {
                        await api.user.delete(`teacher/group/${group.id}`);
                        fetch();
                        message.success('Вы успешно удалили группу!');
                    } catch (e) {
                        message.error('Ой! Произошла ошибка. Попробуйте еще раз позже.');
                    }
                },
            });
        else
            Modal.warning({
                title: 'Удаление невозможно!',
                content: (<div>Вы не можете удалить группу с активными учениками.</div>),
            });
    };

    return <DeleteOutlined onClick={deleteGroup} />;
};

export default DeleteGroupButton;