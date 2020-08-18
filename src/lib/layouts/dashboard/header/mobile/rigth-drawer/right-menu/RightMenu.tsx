import React from 'react';
import HeaderItem from "../../../../../../layouts/dashboard/header/HeaderItem.layout";
import DarkSwitch from "../../../items/dark-switch/DarkSwitch";
import { PoweroffOutlined } from '@ant-design/icons';
import { Menu } from "antd";
import {MenuProps} from "antd/lib/menu";
import styled from "styled-components";

const MenuWrapper: React.FC<MenuProps> = styled(Menu)`  
  &.ant-menu-vertical-right{
    border: 0;
    overflow: hidden;
    width: 100%;
    
    li[mr] {
      display: none;
    }
    
    .ant-menu-item, .ant-menu-submenu-title{
      font-size: 16px;
      padding-left: 24px;
      
      .anticon {
        line-height: 25px;
        min-width: 25px;
        font-size: 25px;
        margin-right: 1.1rem;
        vertical-align: middle;
      }
    }
  }
`;

interface RightMenuProps {
    logout: () => void;
    account?: JSX.Element[];
}

const RightMenu: React.FC<RightMenuProps> = (
    {
        logout,
        account,
        children
    }
) => {
    return (
        <MenuWrapper mode="vertical-right">
            {account}
            {children}
            <HeaderItem key="theme">
                <DarkSwitch/>
            </HeaderItem>
            <HeaderItem onClick={logout} key="exit">
                <PoweroffOutlined /> Выход
            </HeaderItem>
        </MenuWrapper>
    );
};

export default RightMenu;