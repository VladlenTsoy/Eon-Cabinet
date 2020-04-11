import React from "react";
import {Modal} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {apiDeleteAccessToken} from "../../../store/api/actions";
import {deleteCurrentUserData} from "../../../store/user/actions";
import {useScreenWindow} from "../../../effects/use-screen-window.effect";
import Mobile from "./mobile/Mobile";
import Laptop from "./laptop/Laptop";

interface HeaderProps {
    collapsed: boolean;
    toggleSidebar: () => void;
}

const confirm = Modal.confirm;

const Header: React.FC<HeaderProps> = ({children, collapsed, toggleSidebar}) => {
    const {api} = useSelector((state: any) => state);
    const dispatch = useDispatch();

    // Выход
    const logout = () => {
        confirm({
            title: 'Вы действительно хотите выйти?',
            onOk: async () => {
                await api.user_general.delete('/logout');
                dispatch(apiDeleteAccessToken());
                dispatch(deleteCurrentUserData());
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