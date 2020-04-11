import antd, {Drawer} from "antd";
import styled from "styled-components";
import {useSelector} from "react-redux";
import React, {useState} from "react";
import {withRouter, RouteComponentProps} from "react-router";
import Logo from "./logo/Logo";
import LogoEon from "../../../assets/images/logo.svg";
import {useScreenWindow} from "../../../effects/use-screen-window.effect";

const DrawerWrapper = styled(Drawer)`
  .ant-drawer-close{
    line-height: 46px;
    height: 46px;
    color: ${props => props.theme.color_main};

    &:focus, &:hover{
      color: ${props => props.theme.color_black};
    }
  }
  .ant-drawer-body{
    padding: 0;
  }
`;

const SidebarWrapper = styled(antd.Layout.Sider)`
  overflow: hidden;
`;

const SidebarMenu = styled(antd.Menu)`
  &, &.ant-menu-inline-collapsed {
    border: 0 !important;
  }
`;

type SidebarProps = RouteComponentProps & {
    collapsed: boolean;
    toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = (
    {
        children,
        history,
        collapsed,
        toggleSidebar
    }
) => {
    const {app} = useSelector((state: any) => state);
    const [hide, setHide] = useState(false);

    const [, isBreakpoint] = useScreenWindow({breakpoint: 'md'});

    if (isBreakpoint)
        return <DrawerWrapper
            placement="left"
            onClose={toggleSidebar}
            visible={!collapsed}
        >
            <SidebarMenu mode="inline" defaultSelectedKeys={[history.location.pathname]}>
                <Logo logo={LogoEon}/>
                {children}
            </SidebarMenu>
        </DrawerWrapper>;

    return <SidebarWrapper
        width={250}
        breakpoint="lg"
        onBreakpoint={(broken: boolean) => setHide(broken)}
        collapsedWidth={app.action || hide ? 0 : 80}
        theme="light"
        className="sidebar"
        collapsed={collapsed}
    >
        <SidebarMenu mode="inline" defaultSelectedKeys={[history.location.pathname]}>
            <Logo logo={LogoEon}/>
            {children}
        </SidebarMenu>
    </SidebarWrapper>;
};

export default withRouter(Sidebar);