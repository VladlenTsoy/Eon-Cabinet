import React from "react";
import {useSelector} from "react-redux";
import { message, Modal } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

interface DeleteHomeworkProps {
    homework: any;
    fetch: any;
}

const DeleteHomework: React.FC<DeleteHomeworkProps> = ({homework, fetch, children}) => {
    const {api} = useSelector((state: any) => state);

    const handler = () => {
        Modal.confirm({
            icon: <QuestionCircleOutlined/>,
            type: 'error',
            title: 'Вы хотите удалить домашнее задание?',
            async onOk() {
                try {
                    const response = await api.user.delete(`teacher/homework/${homework.id}`);
                    if (response.data.status === 'success') {
                        fetch();
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
            {children}
        </div>
    );
};

export default DeleteHomework;