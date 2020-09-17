import React, {useState} from "react"
import {Button} from "antd"
import {BellFilled} from "@ant-design/icons"
import NotificationsButton from "../../../../../modules/notifications/components/NotificationsButton"

const NotificationsItem: React.FC = () => {
    const [visible, setVisible] = useState(false)

    const open = () => setVisible(true)
    const close = () => setVisible(false)

    return <NotificationsButton close={close} visible={visible}>
        <Button
            type={visible ? "primary" : "default"}
            shape="circle"
            onClick={visible ? close : open}
            icon={<BellFilled/>}
        />
    </NotificationsButton>
}

export default React.memo(NotificationsItem)