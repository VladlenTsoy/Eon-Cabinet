import React from "react";
import antd from "antd";
import {ButtonProps} from "antd/lib/button";
import styled from "styled-components";

type ButtonNavigationProps = ButtonProps & {
    danger?: boolean;
}

// React.FC<ButtonNavigationProps>
const ButtonNavigation = styled(antd.Button)<ButtonNavigationProps>`
  &.ant-btn{
    border-radius: 20px;
    height: 40px;
    padding: 0 25px;
    margin-right: 0.5rem;
    border: 0;
    background: ${props => props.danger ? props.theme.gradient_danger : props.theme.gradient_warning};
    box-shadow: ${props => props.danger ? props.theme.shadow_danger : props.theme.shadow_warning};
    z-index: 1;
    
    &:hover{
      filter: brightness(110%);
    }
    
    &.ant-btn-primary:active, &.ant-btn-primary.active {
      border: 0;
      background: ${props => props.danger ? props.theme.gradient_danger : props.theme.gradient_warning};
    }
    
    &.ant-btn-primary:hover, &.ant-btn-primary:focus {
      background: ${props => props.danger ? props.theme.gradient_danger : props.theme.gradient_warning};
    }
  }
`;

export default ButtonNavigation;