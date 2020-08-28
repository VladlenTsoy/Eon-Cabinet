import React from 'react';
import {CaretDownOutlined} from '@ant-design/icons';
import {Badge, Button, Dropdown, Menu} from "antd";
import styled from "styled-components";
import {PoweroffOutlined} from "@ant-design/icons";
import DarkSwitch from "../../items/dark-switch/DarkSwitch";

export const AccountItem = styled(Menu.Item)`
  &.ant-dropdown-menu-item{
    padding: 0.5rem 3rem 0.5rem 1rem;
    font-size: 14px;
  }
    
  > div > span.anticon, span.anticon:first-child {
    font-size: 18px;
    background: ${props => props.theme['@layout-body-background']};
    padding: 0.5rem;
    border-radius: 50%;
    margin-right: 0.75rem;
    
    &.invert {
      filter: invert(100%)
    }
  }
  
  .ant-badge {
    margin-right: 0.75rem;
    
    span.anticon {
      margin-right: 0;
    }
  }
`

interface AccountMenuProps {
    logout: () => void
}

const AccountMenu: React.FC<AccountMenuProps> = ({logout, children}) => {

    const menu = (
        <Menu>
            {children}
            <Menu.Divider/>
            <AccountItem key="theme">
                <DarkSwitch/>
            </AccountItem>
            <AccountItem onClick={logout} key="exit">
                <PoweroffOutlined/> Выход
            </AccountItem>
        </Menu>
    );

    return <>
        <Badge count={5}>
            <Dropdown overlay={menu} arrow placement="bottomRight">
                <Button shape="circle" icon={<CaretDownOutlined/>}/>
            </Dropdown>
        </Badge>
    </>;
};

export default AccountMenu;