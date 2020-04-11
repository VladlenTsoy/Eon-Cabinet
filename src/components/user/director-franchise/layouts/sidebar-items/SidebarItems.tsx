import React from "react";

import {
    BankOutlined,
    ContainerOutlined,
    DatabaseOutlined,
    DeploymentUnitOutlined,
    DollarOutlined,
    HomeOutlined,
    ScheduleOutlined,
    SettingOutlined,
    UserOutlined,
} from '@ant-design/icons';

import {Link} from "react-router-dom";
import {SidebarItem,SidebarSubItem} from "../../../../../layouts";

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
    <SidebarItem key="/centers">
        <Link to="/centers">
            <BankOutlined />
            <span>Учебные центры</span>
        </Link>
    </SidebarItem>,
    <SidebarSubItem
        key="/settings/*"
        title={
            <span>
                <SettingOutlined />
                <span>Настройки</span>
              </span>
        }
    >
        <SidebarItem key="/settings/franchise">
            <Link to="/settings/franchise">
                <ScheduleOutlined />
                Франшиза
            </Link>
        </SidebarItem>
        <SidebarItem key="/settings/categories">
            <Link to="/settings/categories">
                <DatabaseOutlined />
                Категории
            </Link>
        </SidebarItem>
        <SidebarItem key="/settings/formul-title">
            <Link to="/settings/formul-title">
                <ContainerOutlined />
                Название формул
            </Link>
        </SidebarItem>
        <SidebarItem key="/settings/task-title">
            <Link to="/settings/task-title">
                <ContainerOutlined />
                Название заданий
            </Link>
        </SidebarItem>
        <SidebarItem key="/settings/services">
            <Link to="/settings/services">
                <DeploymentUnitOutlined />
                Услуги
            </Link>
        </SidebarItem>
        <SidebarItem key="/settings/rates">
            <Link to="/settings/rates">
                <DollarOutlined />
                Тарифы
            </Link>
        </SidebarItem>
    </SidebarSubItem>,
];

export default SidebarItems;