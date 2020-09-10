import React, {useState} from 'react';
import HeaderItemLayout from "../../../../layouts/dashboard/header/HeaderItem.layout";
import HeaderMenuLayout from "../../../../layouts/dashboard/header/HeaderMenu.layout";
import { UserOutlined } from '@ant-design/icons';
import HeaderProfile from "../items/profile/HeaderProfile";
import LeftMenuBtn from "./left-menu-btn/LeftMenuBtn";
import RightDrawer from "./rigth-drawer/RightDrawer";

interface MobileProps {
    toggleSidebar: () => void;
    logout: () => void;
    collapsed: boolean;
    account?: JSX.Element[];
}

const Mobile: React.FC<MobileProps> = (
    {
        toggleSidebar,
        collapsed,
        logout,
        account,
        children,
    }
) => {
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
            <HeaderProfile mr="auto"/>
            <HeaderItemLayout onClick={open}>
                <UserOutlined />
            </HeaderItemLayout>
        </HeaderMenuLayout>
        <RightDrawer
            visible={visible}
            logout={logout}
            close={close}
            account={account}
        >
            {children}
        </RightDrawer>
    </>;
};

export default Mobile;