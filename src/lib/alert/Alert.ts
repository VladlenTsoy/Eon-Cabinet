import React from "react";
import {Alert as AntdAlert} from "antd";
import {AlertProps} from "antd/lib/alert";
import styled from "styled-components";

const Alert:React.FC<AlertProps> = styled(AntdAlert)`
  &.ant-alert-with-description{
    margin-bottom: 1.5rem;
    border-radius: 10px;
    border: 0;

    .ant-alert-icon{
      color: #ffffff;
    }
      
    .ant-alert-message{
      color: #ffffff;
    }
    
    .ant-alert-description{
      color: rgba(255, 255, 255, 0.65);
    }
    
    a{
      color: #fff;
      text-decoration: underline;
    }
      
    &.ant-alert-error{
      background: ${props => props.theme.gradient_danger};
      box-shadow: ${props => props.theme.shadow_danger};
    }
    
    &.ant-alert-warning{
       background: ${props => props.theme.gradient_warning};
       box-shadow: ${props => props.theme.shadow_warning};
    }
        
    &.ant-alert-success{
       background: ${props => props.theme.gradient_success};
       box-shadow: ${props => props.theme.shadow_success};
    }
    
    &.ant-alert-info{
       background: ${props => props.theme.gradient_info};
       box-shadow: ${props => props.theme.shadow_info};
    }
  }
`;

export default Alert;