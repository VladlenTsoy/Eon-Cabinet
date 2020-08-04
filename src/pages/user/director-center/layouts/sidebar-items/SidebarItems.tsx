import React from "react";
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Menu } from "antd";
import {Link} from "react-router-dom";

const SidebarItems = [
    <Menu.Item key="/">
        <Link to="/">
            <HomeOutlined />
            <span>Главная страница</span>
        </Link>
    </Menu.Item>,
    <Menu.Item key="/profile">
        <Link to="/profile">
            <UserOutlined />
            <span>Мой профиль</span>
        </Link>
    </Menu.Item>,
];

export default SidebarItems;