import React from 'react';
import {DeleteOutlined} from '@ant-design/icons';
import {message, Modal, Typography} from "antd";
import {useAppContext} from "store/context/use-app-context";

const {confirm} = Modal;
const {Text} = Typography;

interface DeleteCenterItemProps {
    center: any;
    fetch: any;
}

const DeleteCenterItem: React.FC<DeleteCenterItemProps> = ({center, fetch}) => {
    const {api} = useAppContext();
    const deleteGroup = () => {
        confirm({
            title: `Вы действительно хотите удалить центр ${center.title}?`,
            okText: 'Да',
            okType: 'danger',
            cancelText: 'Нет',
            async onOk() {
                try {
                    await api.user.delete(`director-franchise/center/${center.id}`);
                    fetch();
                    message.success('Вы успешно удалили группу!');
                } catch (e) {
                    message.error('Ой! Произошла ошибка. Попробуйте еще раз позже.');
                }
            },
        });
    };

    // @ts-ignore
    return (
        <div onClick={deleteGroup}>
            <Text type="danger">
                <DeleteOutlined/>
                Удалить
            </Text>
        </div>
    );
};

export default DeleteCenterItem;