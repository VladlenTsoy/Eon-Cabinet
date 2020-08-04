import React from "react";
import {Drawer as AntdDrawer} from 'antd';
import {DrawerProps} from 'antd/es/drawer';
import styled from "styled-components";

const DrawerWrapper = styled(({notFooter, children, ...props}: any) => (
    <AntdDrawer {...props}>{children}</AntdDrawer>
))`
  .ant-drawer-close{
    width: 46px;
    height: 46px;
    line-height: 46px;
    color: ${props => props.theme.color_main};
    padding: 0;
    
    &:focus, &:hover{
      color: ${props => props.theme.color_black};
    }
  }
  .ant-drawer-wrapper-body{
    height: 100%;
    overflow: hidden;
      .ant-drawer-header{
        border: 0;
        box-shadow: 0 2px 15px 0 rgba(0,0,0,.05);
        padding: 12px 24px;
      }
      .ant-drawer-body{
        padding-bottom: ${(props: any) => props.notFooter ? '1rem' : '52px'};
        height: ${(props: any) => props.notFooter ? 'auto' : 'calc(100% - 98px)'};
        overflow-y: auto;
      }
  }
`;

export type DrawerCustomProps = DrawerProps & {
    notFooter?: boolean;
}

const Drawer: React.FC<DrawerCustomProps> = ({notFooter, ...props}) => {
    return <DrawerWrapper {...props} notFooter={notFooter}>
        {props.children}
    </DrawerWrapper>;
};

export default Drawer;