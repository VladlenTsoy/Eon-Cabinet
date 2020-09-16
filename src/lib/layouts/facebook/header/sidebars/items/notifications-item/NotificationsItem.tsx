import React, {useState} from "react"
import {SidebarButton} from "../../sidebar-button/SidebarButton"
import {BellFilled} from "@ant-design/icons"
import NotificationsButton from "../../../../../../modules/notifications/components/NotificationsButton"

const NotificationsItem = () => {
    const [visible, setVisible] = useState(false)

    const open = () => setVisible(true)
    const close = () => setVisible(false)

    return <NotificationsButton close={close} visible={visible}>
        <SidebarButton active={visible} onClick={visible ? close : open}>
            <BellFilled/>
        </SidebarButton>
    </NotificationsButton>
}

export default NotificationsItem