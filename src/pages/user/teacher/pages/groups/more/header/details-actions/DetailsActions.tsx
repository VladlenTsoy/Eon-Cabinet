import React from "react"
import {Button} from "../../../../../../../../lib/ui"
import {UserAddOutlined} from "@ant-design/icons"
import CoinButton from "./coin-button/CoinButton"

const DetailsActions = () => {
    return (
        <>
            <Button type="second" size="large" icon={<UserAddOutlined />}>
                Добавить ученика
            </Button>
            <CoinButton/>
        </>
    )
}

export default React.memo(DetailsActions)
