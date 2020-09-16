import React from "react";
import { AppstoreOutlined, HomeOutlined, TeamOutlined, TrophyOutlined, UserOutlined } from '@ant-design/icons';
import {Link} from "react-router-dom";
import {SidebarItem} from "lib/layouts/dashboard";

const SidebarItems = [
    <SidebarItem key="/">
        <Link to="/">
            <HomeOutlined />
            <span>Главная страница</span>
        </Link>
    </SidebarItem>,
    <SidebarItem key="/profile">
        <Link to="/profile">
            <UserOutlined />
            <span>Мой профиль</span>
        </Link>
    </SidebarItem>,
    <SidebarItem key="/homework">
        <Link to="/homework">
            <AppstoreOutlined />
            <span>Домашнее задание</span>
        </Link>
    </SidebarItem>,
    <SidebarItem key="/group">
        <Link to="/group">
            <TeamOutlined />
            <span>Группа</span>
        </Link>
    </SidebarItem>,
    <SidebarItem key="/olympiads">
        <Link to="/olympiads">
            <TrophyOutlined />
            <span>Олимпиада</span>
        </Link>
    </SidebarItem>,
];

export default SidebarItems;