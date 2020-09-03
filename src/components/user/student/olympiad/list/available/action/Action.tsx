import React, {useState} from "react"
import {Button, Modal} from "antd"
import {useAppContext} from "../../../../../../../store/context/use-app-context"
import {FlagOutlined} from "@ant-design/icons"

interface ActionProps {
    olympiad: any
    fetch: any
}

const Action: React.FC<ActionProps> = ({olympiad, fetch}) => {
    const {api} = useAppContext()
    const [loading, setLoading] = useState(false)

    const clickParticipateHandler = async () => {
        setLoading(true)
        await api.user.post(`/student/olympiad/${olympiad.id}/participation`)
        setLoading(false)
        Modal.success({
            title: "Поздравляем!",
            content: `Вы участвуюте в открытой олимпиаде (${olympiad.title}), желаем удачи!`,
            onOk() {
                fetch()
            }
        })
    }

    return <Button
        loading={loading}
        icon={<FlagOutlined/>}
        type="primary"
        onClick={clickParticipateHandler}
    >
        Участвовать
    </Button>
}

export default Action