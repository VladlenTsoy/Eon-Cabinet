import React from "react";
import {Modal} from "antd";
import {QuestionCircleOutlined} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import {deleteHomework} from "../../../../../../../../../../../store/access/teacher/homework/deleteHomework";
import {Homework} from "../../../../../../../../../../../lib/types/teacher/Homework";

interface DeleteHomeworkProps {
    homework: Homework;
}

const DeleteHomework: React.FC<DeleteHomeworkProps> = ({homework, children}) => {
    const dispatch = useDispatch();

    const handler = () => {
        Modal.confirm({
            icon: <QuestionCircleOutlined/>,
            type: 'error',
            title: 'Вы хотите удалить домашнее задание?',
            onOk: async () => dispatch(deleteHomework({categoryId: homework.category_id, homeworkId: homework.id}))
        })
    };

    return <div onClick={handler}>
        {children}
    </div>;
};

export default DeleteHomework;