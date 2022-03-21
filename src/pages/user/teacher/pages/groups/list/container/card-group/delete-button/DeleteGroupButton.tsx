import React from "react"
import {DeleteOutlined} from "@ant-design/icons"
import {useDispatch} from "react-redux"
import {deleteGroup} from "store/group/deleteGroup"
import {Group} from "../../../../../../../../../lib/types/teacher/Group"
import {confirm, warning} from "lib/ui/feedback/modal/confirm"

interface DeleteGroupButtonProps {
    group: Group
}

const DeleteGroupButton: React.FC<DeleteGroupButtonProps> = ({group}) => {
    const dispatch = useDispatch()

    const deleteGroupHandler = async () => {
        if (group.students_count === 0)
            await confirm({
                title: `Вы действительно хотите удалить группу ${group.title}?`,
                okText: "Да",
                okType: "danger",
                cancelText: "Нет",
                onOk: async () => await dispatch(deleteGroup(group.id))
            })
        else
            await warning({
                title: "Удаление невозможно!",
                content: <div>Вы не можете удалить группу с активными учениками.</div>,
                okText: "Ок",
            })
    }

    return (
        <>
            <DeleteOutlined onClick={deleteGroupHandler} />
        </>
    )
}

export default DeleteGroupButton
