import React from "react";
import DisciplinesItem from "./disciplines-item/DisciplinesItem";
import NotificationsItem
    from "../../../../../lib/layouts/facebook/header/sidebars/items/notifications-item/NotificationsItem"
import ChatItem from "../../../../../lib/layouts/facebook/header/sidebars/items/chat-item/ChatItem"

const SidebarItems = [
    <DisciplinesItem key="disciplines"/>,
    <NotificationsItem key="notifications" />,
    <ChatItem key="chat" />
]

export default SidebarItems;