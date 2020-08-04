import React, {useState} from 'react';
import HeaderItemLayout from "../../../../layouts/header/HeaderItem.layout";
import HeaderMenuLayout from "../../../../layouts/header/HeaderMenu.layout";
import { UserOutlined } from '@ant-design/icons';
import HeaderProfile from "../profile/HeaderProfile";
import LeftMenuBtn from "./left-menu-btn/LeftMenuBtn";
import RightDrawer from "./rigth-drawer/RightDrawer";
import {useAppContext} from "../../../../../store/context/use-app-context";

interface MobileProps {
    toggleSidebar: () => void;
    logout: () => void;
    collapsed: boolean;
}

const Mobile: React.FC<MobileProps> = (
    {
        toggleSidebar,
        collapsed,
        logout,
        children,
    }
) => {
    const {user} = useAppContext();
    const [visible, setVisible] = useState(false);

    const open = (): void => setVisible(true);
    const close = (): void => setVisible(false);

    return <>
        <HeaderMenuLayout mode="horizontal">
            <HeaderItemLayout mr="auto">
                <LeftMenuBtn
                    toggleSidebar={toggleSidebar}
                    collapsed={collapsed}
                />
            </HeaderItemLayout>
            <HeaderProfile user={user} mr="auto"/>
            <HeaderItemLayout onClick={open}>
                <UserOutlined />
            </HeaderItemLayout>
        </HeaderMenuLayout>
        <RightDrawer
            visible={visible}
            logout={logout}
            close={close}
        >
            {children}
        </RightDrawer>
    </>;
};

export default Mobile;