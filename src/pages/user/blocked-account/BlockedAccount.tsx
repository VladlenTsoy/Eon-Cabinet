import React from 'react';
import {Layout} from "lib/components";
import SidebarItems from "./layouts/sidebar-items/SidebarItems";
import HeaderItems from "./layouts/header-items/HeaderItems";
import {Route} from "react-router-dom";
import Home from "./pages/home/Home";

const BlockedAccount = () => {
    return <Layout sidebar={SidebarItems} header={HeaderItems}>
            <Route exact path="/" component={Home}/>
        </Layout>;
};

export default BlockedAccount;