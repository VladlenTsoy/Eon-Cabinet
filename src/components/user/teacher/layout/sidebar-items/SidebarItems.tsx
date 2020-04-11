import React from "react";

import {
    BookOutlined,
    DatabaseOutlined,
    HomeOutlined,
    InfoCircleOutlined,
    SettingOutlined,
    TeamOutlined,
    ThunderboltOutlined,
    TrophyOutlined,
    UserOutlined,
} from '@ant-design/icons';

import { Menu } from "antd";
import {Link} from "react-router-dom";
import {SidebarItem, SidebarSubItem} from "../../../../../layouts";
import {useSelector} from "react-redux";
import {find} from "lodash";

const Item = Menu.Item;

const SidebarItems = () => {
    const {app} = useSelector((state: any) => state);
    const isMental = app.disciplines && !!find(app.disciplines, {id: 1});

    return [
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
        <SidebarItem key="/groups">
            <Link to="/groups">
                <TeamOutlined />
                <span>Группы</span>
            </Link>
        </SidebarItem>,
        <SidebarItem key="/homework">
            <Link to="/homework">
                <DatabaseOutlined />
                <span>Домашнее задание</span>
            </Link>
        </SidebarItem>,
        <SidebarItem key="/training">
            <Link to="/training">
                <ThunderboltOutlined />
                <span>Тренировка</span>
            </Link>
        </SidebarItem>,
        <SidebarItem key="/olympiad">
            <Link to="/olympiad">
                <TrophyOutlined />
                <span>Олимпиада</span>
            </Link>
        </SidebarItem>,
        <SidebarSubItem
            key="setting"
            title={
                <div>
                    <SettingOutlined />
                    <span>Настройки</span>
                </div>
            }>
            {/*<Item key="/settings/payments">*/}
            {/*    <Link to="/settings/payments">*/}
            {/*        <Icon type="credit-card"/>*/}
            {/*        <span>Оплата</span>*/}
            {/*    </Link>*/}
            {/*</Item>*/}
            {
                isMental ?
                    <Item key="/settings/custom-algorithms">
                        <Link to="/settings/custom-algorithms">
                            <BookOutlined />
                            <span>Алгоритмы</span>
                        </Link>
                    </Item> : null
            }
        </SidebarSubItem>,
        <SidebarItem key="/platform">
            <Link to="/platform">
                <InfoCircleOutlined />
                <span>Об платформе</span>
            </Link>
        </SidebarItem>,
    ];
};

export default SidebarItems;