import React from "react";
import {Modal} from "antd";
import {QuestionCircleOutlined} from "@ant-design/icons";
import {HomeworkProps} from "../../../../../../../../../../../store/reducers/teacher/homework/homeworkSlice";
import {useDispatch} from "react-redux";
import {deleteHomework} from "../../../../../../../../../../../store/reducers/teacher/homework/deleteHomework";

interface DeleteHomeworkProps {
    homework: HomeworkProps;
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