import React from 'react';
import {Layout} from "lib";
import SidebarItems from "./layouts/sidebar-items/SidebarItems";
import HeaderItems from "./layouts/header-items/HeaderItems";
import {store} from "../../../store/reducers/teacher/store";
import {Provider} from "react-redux";

const BlockedAccount = () => {
    return <Provider store={store}>
        <Layout sidebar={SidebarItems} header={HeaderItems}>
        </Layout>
    </Provider>;
};

export default BlockedAccount;