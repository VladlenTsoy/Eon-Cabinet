import React from "react"
import HeaderTitle from "./title/HeaderTitle"
import HeaderProfile from "../items/profile/HeaderProfile"
import HeaderItemLayout from "../../../../layouts/dashboard/header/HeaderItem.layout"
import HeaderMenuLayout from "../../../../layouts/dashboard/header/HeaderMenu.layout"
import AccountMenu from "./account-menu/AccountMenu"
import Notifications from "../items/notifications-item/NotificationsItem"
import Chat from "../items/chat-item/ChatItem"

interface LaptopProps {
    toggleSidebar: () => void
    logout: () => void
    collapsed: boolean
    account?: JSX.Element[]
}

const Laptop: React.FC<LaptopProps> = ({
    children,
    toggleSidebar,
    collapsed,
    account,
    logout
}) => {
    return (
        <HeaderMenuLayout mode="horizontal">
            <HeaderTitle collapsed={collapsed} toggleSidebar={toggleSidebar} />
            <HeaderProfile mr="auto" />
            {children}
            <HeaderItemLayout key="notifications" className="icon-button first">
                <Notifications />
            </HeaderItemLayout>
            <HeaderItemLayout key="chat" className="icon-button">
                <Chat />
            </HeaderItemLayout>
            <HeaderItemLayout key="account" className="icon-button last">
                <AccountMenu logout={logout}>{account}</AccountMenu>
            </HeaderItemLayout>
        </HeaderMenuLayout>
    )
}

export default Laptop
