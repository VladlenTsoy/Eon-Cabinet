import React from "react";
import {Modal} from "antd";
import {useScreenWindow} from "../../../effects/use-screen-window.effect";
import Mobile from "./mobile/Mobile";
import Laptop from "./laptop/Laptop";
import {QuestionCircleOutlined} from "@ant-design/icons";
import {useAppContext} from "../../../store/context/use-app-context";

interface HeaderProps {
    collapsed: boolean;
    toggleSidebar: () => void;
}

const confirm = Modal.confirm;

const Header: React.FC<HeaderProps> = ({children, collapsed, toggleSidebar}) => {
    const {api, updateUser, updateToken} = useAppContext();

    // Выход
    const logout = () => {
        confirm({
            title: 'Вы действительно хотите выйти?',
            icon: <QuestionCircleOutlined/>,
            onOk: async () => {
                await api.user.delete('/logout');
                updateUser(null);
                updateToken('');
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
    >
        {children}
    </Laptop>;
};

export default Header;