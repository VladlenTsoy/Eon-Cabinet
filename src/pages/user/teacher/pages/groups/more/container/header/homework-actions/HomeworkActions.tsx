import React from "react"
import {Button} from "../../../../../../../../../lib/ui"
import {SendOutlined} from "@ant-design/icons"

const HomeworkActions = () => {
    return (
        <>
            <Button type="second" size="large" icon={<SendOutlined />}>
                Отправить домашнее задание
            </Button>
        </>
    )
}

export default React.memo(HomeworkActions)