import React from 'react';
import {Layout} from "lib";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import SidebarItems from "./layouts/sidebar-items/SidebarItems";
import HeaderItems from "./layouts/header-items/HeaderItems";
import Home from "./home/Home";
import Centers from "./centers/list/Centers";
import CentersStatistic from "./centers/list/Statistic/Statistic";
import Center from "./centers/more/Center";
import Profile from "./profile/Profile";
import Settings from "./settings/Settings";

const DirectorFranchise = () => <Router>
    <Layout sidebar={SidebarItems} header={HeaderItems}>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/profile" component={Profile}/>
            <Route exact path="/centers" component={Centers}/>
            <Route path="/centers/statistic" component={CentersStatistic}/>
            <Route path="/centers/:id" component={Center}/>
            <Route path="/settings/**" component={Settings}/>
        </Switch>
    </Layout>
</Router>;

export default DirectorFranchise;