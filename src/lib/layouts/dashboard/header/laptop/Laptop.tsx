import React from 'react';
import HeaderTitle from "./title/HeaderTitle";
import HeaderProfile from "../profile/HeaderProfile";
import HeaderItemLayout from "../../../../layouts/dashboard/header/HeaderItem.layout";
import DarkSwitch from "../items/dark-switch/DarkSwitch";
import {PoweroffOutlined} from '@ant-design/icons';
import HeaderMenuLayout from "../../../../layouts/dashboard/header/HeaderMenu.layout";
import {useSelector} from "react-redux";
import {userSelector} from "../../../../../store/common/user/userSlice";

interface LaptopProps {
    toggleSidebar: () => void;
    logout: () => void;
    collapsed: boolean;
}

const Laptop: React.FC<LaptopProps> = (
    {
        children,
        toggleSidebar,
        collapsed,
        logout
    }
) => {
    const user = useSelector(userSelector);
    return (
        <HeaderMenuLayout mode="horizontal">
            <HeaderTitle collapsed={collapsed} toggleSidebar={toggleSidebar}/>
            <HeaderProfile user={user.detail}/>
            {children}
            <HeaderItemLayout key="theme">
                <DarkSwitch/>
            </HeaderItemLayout>
            <HeaderItemLayout onClick={logout} key="exit">
                <PoweroffOutlined/> Выход
            </HeaderItemLayout>
        </HeaderMenuLayout>
    );
};

export default Laptop;