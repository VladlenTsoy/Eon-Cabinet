import React from 'react';
import {DeleteOutlined, QuestionCircleOutlined} from "@ant-design/icons";
import {message, Modal} from "antd";
import {useAppContext} from "../../../../../../../../../store/context/use-app-context";

interface DeleteItemProps {
    record: any;
    fetch: () => void;
}

const DeleteItem: React.FC<DeleteItemProps> = ({record, fetch}) => {
    const {api} = useAppContext();

    const handlerClick = () => {
        Modal.confirm({
            title: `Вы действительно хотите удалить (${record.title})?`,
            icon: <QuestionCircleOutlined/>,
            okType: 'danger',
            onOk: async () => {
                await api.user.delete(`teacher/custom-exercises/${record.id}`);
                message.success(`Вы успешно удалили (${record.title})!`);
                fetch();
            }
        });
    };

    return <div onClick={handlerClick}>
        <DeleteOutlined/>
        <span>Удалить</span>
    </div>
};

export default DeleteItem;