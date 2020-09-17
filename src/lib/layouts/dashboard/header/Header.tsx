import React from "react";
import {useScreenWindow} from "../../../../hooks/use-screen-window.effect";
import Mobile from "./mobile/Mobile";
import Laptop from "./laptop/Laptop";
import {useUser} from "../../../../hooks/use-user"

interface HeaderProps {
    collapsed: boolean;
    toggleSidebar: () => void;
    account?: JSX.Element[];
}

const Header: React.FC<HeaderProps> = ({children, collapsed, account, toggleSidebar}) => {
    const {logout} = useUser()
    const [, isBreakpoint] = useScreenWindow({breakpoint: 'md'});

    if (isBreakpoint)
        return <Mobile
            toggleSidebar={toggleSidebar}
            collapsed={collapsed}
            logout={logout}
            account={account}
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