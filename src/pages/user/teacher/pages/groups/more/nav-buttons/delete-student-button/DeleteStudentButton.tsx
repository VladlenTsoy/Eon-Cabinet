import React from 'react';
import {Modal} from "antd";
import {DeleteOutlined, ExclamationCircleOutlined} from "@ant-design/icons";
import {NavigationButton} from "lib/ui";
import {useDispatch} from "react-redux";
import {deleteStudents} from "../../../../../../../../store/access/teacher/students/details/deleteStudents";
import {useParams} from "react-router-dom";
import {ParamsProps} from "../../Group";
import {useSelectSelectedStudentsByIdsGroupId} from "../../../../../../../../store/access/teacher/students/studentsSelectors";

const {confirm} = Modal;

const DeleteStudentButton: React.FC = () => {
    const {id} = useParams<ParamsProps>();
    const dispatch = useDispatch();
    const selectedIds = useSelectSelectedStudentsByIdsGroupId(Number(id))

    const deleteUsers = () => {
        confirm({
            icon: <ExclamationCircleOutlined />,
            title: 'Вы действительно хотите удалить учеников?',
            okText: 'Да',
            okType: 'danger',
            async onOk() {
                await dispatch(deleteStudents(selectedIds));
            },
        });
    };

    return <NavigationButton
        type="primary"
        danger
        disabled={!selectedIds.length}
        onClick={deleteUsers}
        icon={<DeleteOutlined/>}>
        Удалить
    </NavigationButton>;
};

export default DeleteStudentButton;