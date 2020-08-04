import React from 'react';
import {useSelector} from "react-redux";
import {Spin} from "../../../lib/components";
import {Layout} from "../../../lib/components";
import SidebarItems from "./layouts/sidebar-items/SidebarItems";
import HeaderItems from "./layouts/header-items/HeaderItems";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./home/Home";
import Profile from "./profile/Profile";
import Centers from "./centers/list/Centers";
import CentersStatistic from "./centers/list/Statistic/Statistic";
import Center from "./centers/more/Center";
import Settings from "./settings/Settings";

const DirectorFranchiseRoutes = () => {
    const {app} = useSelector((state: any) => (state));
    return <Spin spinning={app.spin} tip="Изменяем тему...">
        <Router>
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
        </Router>
    </Spin>
};

export default DirectorFranchiseRoutes;