import React from 'react';
import {Link} from "react-router-dom";
import {NavigationButton, Navigation} from "lib";
import {PlusOutlined, AppstoreOutlined} from "@ant-design/icons";

const NavButtons = () => {
    return <Navigation>
        <Link to="/homework/create">
            <NavigationButton type="primary" icon={<PlusOutlined/>}>
                Создать домашнее задание
            </NavigationButton>
        </Link>
        <Link to="/settings/custom-exercises">
            <NavigationButton type="primary" icon={<AppstoreOutlined/>}>
                Свои примеры
            </NavigationButton>
        </Link>
    </Navigation>;
};

export default React.memo(NavButtons);