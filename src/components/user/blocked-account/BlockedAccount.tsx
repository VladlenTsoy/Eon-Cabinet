import React from 'react';
import {Layout} from "lib";
import SidebarItems from "./layouts/sidebar-items/SidebarItems";
import HeaderItems from "./layouts/header-items/HeaderItems";

const BlockedAccount = () => {
    return <Layout sidebar={SidebarItems} header={HeaderItems}>
    </Layout>;
};

export default BlockedAccount;