import React from "react";
import {useSelector} from "react-redux";
import { DeleteOutlined } from '@ant-design/icons';
import { message, Modal } from "antd";

const DeleteHomework: React.FC<any> = ({homework, setLoading}) => {
    const {api} = useSelector((state: any) => state);

    const handler = () => {
        Modal.confirm({
            type: 'error',
            title: 'Вы хотите удалить домашнее задание?',
            async onOk() {
                try {
                    const response = await api.user.delete(`teacher/homework/${homework.id}`);
                    if (response.data.status === 'success') {
                        setLoading(true);
                        message.success('Вы успешно удалили домашнее задание!');
                    }
                } catch (e) {
                    console.log(e);
                }
            }
        })
    };

    return (
        <div onClick={handler}>
            <DeleteOutlined /> Удалить
        </div>
    );
};

export default DeleteHomework;