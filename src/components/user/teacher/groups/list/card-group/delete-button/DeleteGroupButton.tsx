import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { Modal, message } from "antd";
import {useSelector} from "react-redux";

interface DeleteGroupButtonProps {
    group: any;
    fetch: any;
}

const {confirm} = Modal;

const DeleteGroupButton: React.FC<DeleteGroupButtonProps> = ({group, fetch}) => {
    const {api} = useSelector((state: any) => state);
    const deleteGroup = () => {
        if (group.count === 0)
            confirm({
                title: `Вы действительно хотите удалить группу ${group.title}?`,
                okText: 'Да',
                okType: 'danger',
                cancelText: 'Нет',
                async onOk() {
                    try {
                        await api.user_general.delete(`teacher/group/${group.id}`);
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