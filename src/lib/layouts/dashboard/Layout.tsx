import React, {useEffect, useState} from 'react';
import {Layout as AntdLayout} from 'antd';
import styled from "styled-components";
import Sidebar from "./sidebar/Sidebar";
import Header from "./header/Header";
import {withRouter, RouteComponentProps} from 'react-router';

const LayoutStyled = styled(AntdLayout)`
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

const DrawerContainer = styled.div`
  height: calc(100% - 46px);
  overflow: hidden;
  position: relative;
`

const Content = styled(AntdLayout.Content)`
    padding: 1rem;
    min-height: auto!important;
    overflow-x: hidden;
    position: relative;
    height: 100%;
    
    @media (max-width: 768px) {
      padding: 1rem 0.5rem;
    }
`

type LayoutProps = RouteComponentProps & {
    history?: any;
    header: JSX.Element[];
    sidebar: JSX.Element[];
    account?: JSX.Element[];
}

const Layout: React.FC<LayoutProps> = (
    {
        children,
        history,
        header,
        sidebar,
        account,
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

    return <LayoutStyled>
        <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar}>{sidebar}</Sidebar>
        <LayoutStyled>
            <Header collapsed={collapsed} toggleSidebar={toggleSidebar} account={account}>{header}</Header>
            <DrawerContainer className="draw-container">
                <Content>
                    {children}
                </Content>
            </DrawerContainer>
        </LayoutStyled>
    </LayoutStyled>
};

export default withRouter(Layout);