import React from "react"
import {Button} from "../../../../../../../../../lib/ui"
import {UserAddOutlined, DeleteFilled} from "@ant-design/icons"
import CoinButton from "./coin-button/CoinButton"
const DetailsActions = () => {
    return (
        <>
            <Button type="second" size="large" icon={<UserAddOutlined />}>
                Добавить ученика
            </Button>
            <CoinButton/>
            <Button type="second" size="large" icon={<DeleteFilled />}>
                Удалить
            </Button>
        </>
    )
}

export default React.memo(DetailsActions)
