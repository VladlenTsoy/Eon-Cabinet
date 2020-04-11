import styled from "styled-components";
import {Menu} from "antd";

const HeaderMenuLayout = styled(Menu)`
  &.ant-menu-horizontal{
    border: 0;
    font-size: 14px;
    box-shadow: 0 2px 15px 0 rgba(0, 0, 0, .05);;
    display: flex;
    z-index: 5;
    height: 46px;
  }
`;

export default HeaderMenuLayout;