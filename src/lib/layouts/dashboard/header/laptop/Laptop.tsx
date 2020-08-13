import React from 'react';
import HeaderTitle from "./title/HeaderTitle";
import HeaderProfile from "../profile/HeaderProfile";
import HeaderItemLayout from "../../../../layouts/dashboard/header/HeaderItem.layout";
import HeaderMenuLayout from "../../../../layouts/dashboard/header/HeaderMenu.layout";
import {useSelector} from "react-redux";
import {userSelector} from "../../../../../store/common/user/userSlice";
import AccountMenu from "./account-menu/AccountMenu";

interface LaptopProps {
    toggleSidebar: () => void;
    logout: () => void;
    collapsed: boolean;
    account?: JSX.Element[];
}

const Laptop: React.FC<LaptopProps> = (
    {
        children,
        toggleSidebar,
        collapsed,
        account,
        logout
    }
) => {
    const user = useSelector(userSelector);
    return (
        <HeaderMenuLayout mode="horizontal">
            <HeaderTitle collapsed={collapsed} toggleSidebar={toggleSidebar}/>
            <HeaderProfile user={user.detail}/>
            {children}
            <HeaderItemLayout key="account">
                <AccountMenu logout={logout}>
                    {account}
                </AccountMenu>
            </HeaderItemLayout>
        </HeaderMenuLayout>
    );
};

export default Laptop;