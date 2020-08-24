import {Tabs as AntdTabs} from "antd";
import styled from "styled-components";

const Tabs = styled(AntdTabs)`
  &.ant-tabs-card.ant-tabs-left > .ant-tabs-nav .ant-tabs-tab {
    font-size: 16px;
    border-radius: 10px;
    background: ${props => props.theme['@component-background']}73;
    border: 0;

    :not(:last-of-type) {
      margin-bottom: 5px;
    }
  
    &.ant-tabs-tab-active {
      background: ${props => props.theme['@component-background']};
      box-shadow: 0 5px 10px 0 rgba(0,0,0,0.1);
    }
  }
  
  &.ant-tabs-left > .ant-tabs-content-holder {
    border-left: 0;
  }  
  
  &.ant-tabs-card.ant-tabs-top > .ant-tabs-nav .ant-tabs-tab {
    font-size: 16px;
    border-radius: 10px;
    background: ${props => props.theme['@component-background']}73;
    border: 0;

    :not(:last-of-type){
      margin-right: 5px;
    }
    
    &.ant-tabs-tab-active {
      background: ${props => props.theme['@component-background']};
      box-shadow: 0 5px 10px 0 rgba(0,0,0,0.1);
    }
  }
`

export default Tabs;