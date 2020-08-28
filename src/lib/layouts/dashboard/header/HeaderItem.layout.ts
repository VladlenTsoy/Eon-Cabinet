import React from "react";
import styled from "styled-components";
import {Menu as AntdMenu} from "antd";
import {MenuItemProps} from "antd/lib/menu/MenuItem";

interface StyledProps {
    mr?: string;
}

type HeaderItemProps = MenuItemProps & StyledProps;

const HeaderItemLayout: React.FC<HeaderItemProps> = styled(AntdMenu.Item)<StyledProps>`
  .ant-menu-horizontal:not(.ant-menu-dark) > &{
    ${props => `margin-right: ${props.mr};`};

    &.ant-menu-item-selected {
      border-bottom: none;
    }
    
    &.ant-menu-item {
      display: flex;
      align-items: center;
      margin-top: 0;
      top: 0;
      border-bottom: none;
    }
    
    &.ant-menu-item:hover {
      border-bottom: none;
    }
    
    &.icon-button{
      :not(.last):not(.first) {
        margin-right: 0.5rem;
        margin-left: 0.5rem;
      }
      
      .anticon {
        margin: 0;
      }
      
      &.first {
        margin-right: 0.5rem;
      }
      
      &.last{
        margin-left: 0.5rem;
      }
    }
  }
  
  @media (max-width: 768px) {
    .ant-menu-horizontal &.ant-menu-item .anticon{
      margin-right: 0;
      font-size: 25px;
    }
  }
`;

export default HeaderItemLayout;