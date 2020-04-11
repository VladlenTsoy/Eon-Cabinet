import React from "react";
import styled from "styled-components";
import {Menu} from "antd";
import {MenuItemProps} from "antd/es/menu/MenuItem";

type SidebarItemProps = MenuItemProps;

const SidebarItemLayout: React.FC<SidebarItemProps> = styled(Menu.Item)`
  ul.ant-menu.ant-menu-inline-collapsed > &{
      padding: 0 28px !important;
  }
  
  .ant-menu &{
      width: 100%;
      
      &.ant-menu-item-selected {
        background: transparent !important;
        
        &::after {
          content: none;
          border: 0;
        }
      }
            
      span {
        font-size: 16px;
      }
        
      a span.anticon {
        line-height: 25px;
        min-width: 25px;
        font-size: 25px;
        margin-right: 1.1rem;
        vertical-align: middle;
      }
  }
`;

export default SidebarItemLayout;