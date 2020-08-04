import React from "react";

import {
    BookOutlined,
    CreditCardOutlined,
    DatabaseOutlined,
    HomeOutlined,
    PushpinOutlined,
    RobotOutlined,
    SettingOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';

import { Menu } from "antd";
import {Link} from "react-router-dom";
import {SidebarItem, SidebarSubItem} from '../../../../../lib/layouts/dashboard';

const Item = Menu.Item;

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
    <SidebarItem key="/directors">
        <Link to="/directors">
            <TeamOutlined />
            <span>Директора</span>
        </Link>
    </SidebarItem>,
    <SidebarItem key="/franchises">
        <Link to="/franchises">
            <BookOutlined />
            <span>Франшизы</span>
        </Link>
    </SidebarItem>,
    <SidebarSubItem key="tasks"
             title={
                 <div>
                     <RobotOutlined />
                     <span>Упражнения</span>
                 </div>
             }>
        <Item key="/tasks/digital-picture">
            <Link to="/tasks/digital-picture">
                <DatabaseOutlined />
                <span>Цифра-Картинка</span>
            </Link>
        </Item>
        <Item key="/tasks/countries">
            <Link to="/tasks/countries">
                <DatabaseOutlined />
                <span>Страны</span>
            </Link>
        </Item>
        <Item key="/tasks/personalities">
            <Link to="/tasks/personalities">
                <DatabaseOutlined />
                <span>Личности</span>
            </Link>
        </Item>
        <Item key="/tasks/words">
            <Link to="/tasks/words">
                <DatabaseOutlined />
                <span>Слова</span>
            </Link>
        </Item>
        <Item key="/tasks/word-numbers">
            <Link to="/tasks/word-numbers">
                <DatabaseOutlined />
                <span>Главная система</span>
            </Link>
        </Item>
    </SidebarSubItem>,
    <SidebarSubItem key="setting"
             title={
                 <div>
                     <SettingOutlined />
                     <span>Настройки</span>
                 </div>
             }>
        <Item key="/settings/cities">
            <Link to="/settings/cities">
                <PushpinOutlined />
                <span>Города</span>
            </Link>
        </Item>
        <Item key="/settings/prices">
            <Link to="/settings/prices">
                <CreditCardOutlined />
                <span>Цены</span>
            </Link>
        </Item>
        {/*<Item key="/settings/disciplines">*/}
        {/*    <Link to="/settings/disciplines">*/}
        {/*        <Icon type="database"/>*/}
        {/*        <span>Дисциплины</span>*/}
        {/*    </Link>*/}
        {/*</Item>*/}
        <Item key="/settings/categories">
            <Link to="/settings/categories">
                <DatabaseOutlined />
                <span>Категории</span>
            </Link>
        </Item>
    </SidebarSubItem>,
];

export default SidebarItems;