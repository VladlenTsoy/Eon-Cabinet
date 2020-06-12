import React from 'react';
import {Layout} from "lib";
import SidebarItems from "./layouts/sidebar-items/SidebarItems";
import HeaderItems from "./layouts/header-items/HeaderItems";
import {store} from "../../../store/reducers/teacher/store";
import {Provider} from "react-redux";
import {Route} from "react-router-dom";
import Home from "./pages/home/Home";

const BlockedAccount = () => {
    return <Provider store={store}>
        <Layout sidebar={SidebarItems} header={HeaderItems}>
            <Route exact path="/" component={Home}/>
        </Layout>
    </Provider>;
};

export default BlockedAccount;