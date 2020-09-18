import React from "react"
import {
    DatabaseOutlined,
    HomeOutlined,
    TeamOutlined,
    ThunderboltOutlined,
    TrophyOutlined
} from "@ant-design/icons"
import {Link} from "react-router-dom"
import {SidebarItem} from "lib/layouts/dashboard"


const SidebarItems = [
    <SidebarItem key="/">
        <Link to="/">
            <HomeOutlined/>
            <span>Главная страница</span>
        </Link>
    </SidebarItem>,
    <SidebarItem key="/groups">
        <Link to="/groups">
            <TeamOutlined/>
            <span>Группы</span>
        </Link>
    </SidebarItem>,
    <SidebarItem key="/homework">
        <Link to="/homework">
            <DatabaseOutlined/>
            <span>Домашнее задание</span>
        </Link>
    </SidebarItem>,
    <SidebarItem key="/training">
        <Link to="/training">
            <ThunderboltOutlined/>
            <span>Тренировка</span>
        </Link>
    </SidebarItem>,
    <SidebarItem key="/olympiad">
        <Link to="/olympiad">
            <TrophyOutlined/>
            <span>Олимпиада</span>
        </Link>
    </SidebarItem>
]

export default SidebarItems