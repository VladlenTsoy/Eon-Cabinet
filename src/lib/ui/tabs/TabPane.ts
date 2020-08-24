import styled from "styled-components";
import {Tabs as AntdTabs} from "antd";

const {TabPane: AntdTabPane} = AntdTabs;

export const TabPane = styled(AntdTabPane)`
  .ant-tabs-left > .ant-tabs-content-holder > .ant-tabs-content > &.ant-tabs-tabpane {
    padding-left: 1rem;
  }
`
export default TabPane;