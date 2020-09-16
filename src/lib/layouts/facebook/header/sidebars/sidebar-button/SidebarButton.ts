import styled from "styled-components";
import React from "react";
import {Badge} from "antd";

interface ButtonStyledProps extends React.HTMLProps<HTMLButtonElement> {
    active: boolean;
}

export const SidebarButton: React.FC<ButtonStyledProps> = styled.button<ButtonStyledProps>`
  border-radius: 50%;
  border: 0;
  height: 45px;
  width: 45px;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  background: ${props => props.active ? props.theme.color_primary : props.theme['@layout-body-background']};
  color: ${props => props.active ? '#fff' : props.theme.color_main};
  outline: none;

  > div:not(:last-child){
    margin-right: 0.5rem;
  }
`;

export const SidebarBadge = styled(Badge)`
  //.ant-badge-count {
  //  transform: translate(-10%, -25%);
  //}
`;