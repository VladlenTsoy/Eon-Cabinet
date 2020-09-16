import React from "react";
import styled from "styled-components";
import {Menu} from "antd";
import {MenuItemProps} from "antd/es/menu/MenuItem";

const AccountItem:React.FC<MenuItemProps> = styled(Menu.Item)`
  &.ant-menu-item{
    padding: 0;
    font-size: 16px;
    line-height: 50px;
    height: 50px;
  }
  
  .anticon{
    font-size: 16px;
    margin-right: 1rem;
  }
`;

export default AccountItem;
