import React from "react";
import styled from "styled-components";
import {Menu} from "antd";
import {SubMenuProps} from "antd/lib/menu/SubMenu";

type SidebarSubItemProps = SubMenuProps

const SidebarSubItemLayout:React.FC<SidebarSubItemProps> = styled(Menu.SubMenu)`
  ul.ant-menu.ant-menu-inline-collapsed > & .ant-menu-submenu-title{
    padding: 0 28px !important;
  }
  
  .ant-menu & .ant-menu-submenu-title{
    width: 100%;
    
    &.ant-menu-item-selected {
    background: #ffffff !important;
    
    &::after {
      content: none;
      border: 0;
    }
    }
        
    span {
    font-size: 16px;
    }
    
    span.anticon {
    line-height: 25px;
    min-width: 25px;
    font-size: 25px;
    margin-right: 1.1rem;
    vertical-align: middle;
    }
  }
  
  .ant-menu.ant-menu-sub{
    font-size: 16px;
    span.anticon {
     line-height: 20px;
     min-width: 20px;
     font-size: 20px;
     margin-right: 1.1rem;
     vertical-align: middle;
    }
  }
`;

export default SidebarSubItemLayout;