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
    account?: JSX.Element[];
}

const RightDrawer: React.FC<RightDrawerProps> = (
    {
        visible,
        logout,
        close,
        account,
        children
    }
) => {
    return <DrawerWrapper
        title="Меню"
        visible={visible}
        onClose={close}
        notFooter
    >
        <RightMenu
            account={account}
            logout={logout}
        >
            {children}
        </RightMenu>
    </DrawerWrapper>;
};

export default RightDrawer;