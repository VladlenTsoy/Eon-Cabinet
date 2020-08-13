import React from "react";
import {Modal} from "antd";
import {useScreenWindow} from "../../../../hooks/use-screen-window.effect";
import Mobile from "./mobile/Mobile";
import Laptop from "./laptop/Laptop";
import {QuestionCircleOutlined} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import {logoutUser} from "../../../../store/common/user/logoutUser";

interface HeaderProps {
    collapsed: boolean;
    toggleSidebar: () => void;
    account?: JSX.Element[];
}

const confirm = Modal.confirm;

const Header: React.FC<HeaderProps> = ({children, collapsed, account, toggleSidebar}) => {
    const dispatch = useDispatch();

    // Выход
    const logout = () => {
        confirm({
            title: 'Вы действительно хотите выйти?',
            icon: <QuestionCircleOutlined/>,
            onOk: async () => {
                dispatch(logoutUser());
            },
        });
    };

    const [, isBreakpoint] = useScreenWindow({breakpoint: 'md'});

    if (isBreakpoint)
        return <Mobile
            toggleSidebar={toggleSidebar}
            collapsed={collapsed}
            logout={logout}
        >
            {children}
        </Mobile>;

    return <Laptop
        toggleSidebar={toggleSidebar}
        logout={logout}
        collapsed={collapsed}
        account={account}
    >
        {children}
    </Laptop>;
};

export default Header;