import React from "react"
import {LockFilled} from "@ant-design/icons"
import {confirm} from "lib/ui"
import {blockStudent} from "store/students/blockStudent"
import {useDispatch} from "react-redux"

interface BlockButtonProps {
    student: any
}

const BlockButton: React.FC<BlockButtonProps> = ({student}) => {
    const dispatch = useDispatch()

    const clickHandler = () => {
        confirm({
            title: `Заблокировать (${student.first_name} ${student.last_name})?`,
            content: `Ученику (${student.first_name} ${student.last_name}) будет 
            заблокирован доступ к его личному кабинету,
             разблокировать возможно только после 20 дней или оплаты.`,
            onOk: async () => {
                await dispatch(blockStudent({studentId: student.id}))
            },
            okText: 'Да',
            cancelText: 'Нет',
        })
    }

    return <div onClick={clickHandler}>
        <LockFilled />  Заблокировать
    </div>
}

export default BlockButton
