import React from 'react';
import RightMenu from "./right-menu/RightMenu";
import Drawer, {DrawerCustomProps} from "../../../../../components/drawer/Drawer";
import styled from "styled-components";

const DrawerWrapper:React.FC<DrawerCustomProps> = styled(Drawer)`
  .ant-drawer-body{
    padding: 5px 0;
  }
`;

interface RightDrawerProps {
    visible: boolean;
    logout: () => void;
    close: () => void;
}

const RightDrawer: React.FC<RightDrawerProps> = (
    {
        visible,
        logout,
        close,
        children
    }
) => {
    return <DrawerWrapper
        title="Меню"
        visible={visible}
        onClose={close}
        notFooter
    >
        <RightMenu logout={logout}>
            {children}
        </RightMenu>
    </DrawerWrapper>;
};

export default RightDrawer;