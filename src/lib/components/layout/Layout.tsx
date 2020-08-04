import React, {useEffect, useState} from 'react';
import {Layout as AntdLayout} from 'antd';
import styled from "styled-components";
import Sidebar from "./sidebar/Sidebar";
import Header from "./header/Header";
import {withRouter, RouteComponentProps} from 'react-router';

type LayoutProps = RouteComponentProps & {
    history?: any;
    header: JSX.Element[];
    sidebar: JSX.Element[];
}

const LayoutWrapper = styled(AntdLayout)`
  &.ant-layout{
    height: 100%;
    overflow-x: hidden;
    .ant-layout-sider-children{
     > .ant-menu {
        height: 100%;
     }
    }
  }
`;

const Content = styled(AntdLayout.Content)`
    padding: 1rem;
    min-height: auto!important;
    overflow-x: hidden;
    position: relative;
    height: calc(100% - 46px);
    
    @media (max-width: 768px) {
      padding: 1rem 0.5rem;
    }
`;

const Layout: React.FC<LayoutProps> = (
    {
        children,
        history,
        header,
        sidebar
    }
) => {
    const [collapsed, setCollapsed] = useState(true);
    const toggleSidebar = () => setCollapsed(!collapsed);

    useEffect(() => {
        history.listen(() => {
            setCollapsed(true);
        });
        return () => {
            history.listen = null
        }
    }, [history]);

    return <LayoutWrapper>
        <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar}>{sidebar}</Sidebar>
        <LayoutWrapper>
            <Header collapsed={collapsed} toggleSidebar={toggleSidebar}>{header}</Header>
            <Content>
                {children}
            </Content>
        </LayoutWrapper>
    </LayoutWrapper>
};

export default withRouter(Layout);