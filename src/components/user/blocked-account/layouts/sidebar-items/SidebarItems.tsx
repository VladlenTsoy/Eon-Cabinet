import React from "react";
import { CreditCardOutlined, HomeOutlined } from '@ant-design/icons';
import {Link} from "react-router-dom";
import {SidebarItem} from "../../../../../layouts";

const SidebarItems = [
    <SidebarItem key="/">
        <Link to="/">
            <HomeOutlined />
            <span>Главная страница</span>
        </Link>
    </SidebarItem>,
    // <SidebarItem key="/settings/payments">
    //     <Link to="/settings/payments">
    //         <CreditCardOutlined />
    //         <span>Оплата</span>
    //     </Link>
    // </SidebarItem>,
];

export default SidebarItems;