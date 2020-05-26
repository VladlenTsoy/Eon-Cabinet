import React from "react";
import { DeleteOutlined } from '@ant-design/icons';
import { message, Modal } from "antd";
import {useSelector} from "react-redux";
import {QuestionCircleOutlined } from "@ant-design/icons";

const ItemDelete: React.FC<any> = ({user, afterAction}) => {
    const {api} = useSelector((state: any) => (state));

    const deleteAccount = async (teacher: any) => {
        Modal.confirm({
            icon: <QuestionCircleOutlined />,
            title: `Удалить (${teacher.last_name} ${teacher.first_name})`,
            content: `Вы действительно хотите удалить учителя (${teacher.last_name} ${teacher.first_name})?`,
            okType: 'danger',
            async onOk() {
                try {
                    const response = await api.user.delete(`/${teacher.id}`);
                    if (response.data.status === 'success')
                        message.info(`Вы успешно удалили аккаунт ID: ${teacher.id}.`);
                } catch (e) {
                    message.error(`Произошла неизвестная ошибка!`);
                }
                afterAction();
            }
        });
    };

    return (
        <div onClick={() => deleteAccount(user)}>
            <DeleteOutlined /> Удалить
        </div>
    );
};

export default ItemDelete;