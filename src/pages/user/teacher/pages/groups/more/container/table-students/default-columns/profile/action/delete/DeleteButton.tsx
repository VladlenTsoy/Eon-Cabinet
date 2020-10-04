import React from "react"
import {DeleteFilled} from "@ant-design/icons"
import {useDispatch} from "react-redux"
import {deleteStudent} from "../../../../../../../../../../../../store/access/teacher/students/deleteStudent"
import {Modal} from "antd"

interface DeleteButtonProps {
    student: any;
}

const DeleteButton:React.FC<DeleteButtonProps> = ({student}) => {
    const dispatch = useDispatch()

    const deleteUsers = () => {
        Modal.confirm({
            title: `Вы действительно хотите удалить прользователя (${student.first_name} ${student.last_name})?`,
            okText: 'Да',
            okType: 'danger',
            async onOk() {
                await dispatch(deleteStudent(student.id))
            },
        });
    };

    return (
        <div onClick={deleteUsers}>
            <DeleteFilled/> Удалить
        </div>
    )
}

export default DeleteButton