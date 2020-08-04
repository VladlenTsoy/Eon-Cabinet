import React from 'react';
import {Layout} from "lib/components";
import {BrowserRouter as Router, Switch} from "react-router-dom";
import SidebarItems from "./layouts/sidebar-items/SidebarItems";
import HeaderItems from "./layouts/header-items/HeaderItems";

const DirectorCenter = () => <Router>
    <Layout sidebar={SidebarItems} header={HeaderItems}>
        <Switch>
            {/*<Route exact path="/" component={}/>*/}
        </Switch>
    </Layout>
</Router>;

export default DirectorCenter;