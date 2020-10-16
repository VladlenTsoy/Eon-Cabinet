import React from "react"
import {DeleteOutlined} from "@ant-design/icons"
import {Modal} from "antd"
import {useDispatch} from "react-redux"
import {deleteGroup} from "store/access/teacher/group/deleteGroup"
import {Group} from "../../../../../../../../../lib/types/teacher/Group"
import {confirm} from "utils/confirm"

interface DeleteGroupButtonProps {
    group: Group
}

const {warning} = Modal

const DeleteGroupButton: React.FC<DeleteGroupButtonProps> = ({group}) => {
    const dispatch = useDispatch()

    const deleteGroupHandler = () => {
        if (group.students_count === 0)
            confirm({
                title: `Вы действительно хотите удалить группу ${group.title}?`,
                okText: "Да",
                okType: "danger",
                cancelText: "Нет",
                onOk: async () => await dispatch(deleteGroup(group.id))
            })
        else
            warning({
                title: "Удаление невозможно!",
                content: <div>Вы не можете удалить группу с активными учениками.</div>
            })
    }

    return (
        <>
            <DeleteOutlined onClick={deleteGroupHandler} />
        </>
    )
}

export default DeleteGroupButton
