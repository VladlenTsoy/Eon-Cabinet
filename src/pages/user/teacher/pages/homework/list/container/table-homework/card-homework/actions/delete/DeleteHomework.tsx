import React from "react";
import {confirm} from "lib/ui";
import {QuestionCircleOutlined} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import {deleteHomework} from "store/homework/deleteHomework";
import {Homework} from "../../../../../../../../../../../lib/types/teacher/Homework";

interface DeleteHomeworkProps {
    homework: Homework;
}

const DeleteHomework: React.FC<DeleteHomeworkProps> = ({homework, children}) => {
    const dispatch = useDispatch();

    const handler = () => {
        confirm({
            icon: <QuestionCircleOutlined/>,
            type: 'error',
            title: 'Вы хотите удалить домашнее задание?',
            onOk: async () => dispatch(deleteHomework({categoryId: homework.category_id, homeworkId: homework.id})),
            okText: 'Да',
            cancelText: 'Нет',
        })
    };

    return <div onClick={handler}>
        {children}
    </div>;
};

export default DeleteHomework;
