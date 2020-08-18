import React from 'react';
import Layout from "../../../lib/layouts/dashboard/Layout";
import SidebarItems from "./layouts/sidebar-items/SidebarItems";
import HeaderItems from "./layouts/header-items/HeaderItems";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Franchises from "./pages/franchises/Franchises";
import FranchisesStatistic from "./pages/franchises-statistic/FranchisesStatistic";
import Franchise from "./pages/franchise/Franchise";
import Center from "./pages/center/Center";
import Directors from "./pages/directors/Directors";
import Countries from "./pages/tasks/countries/Countries";
import Personalities from "./pages/tasks/personalities/Personalities";
import Words from "./pages/tasks/words/Words";
import DigitalPicture from "./pages/tasks/digital-pictures/DigitalPicture";
import WordNumbers from "./pages/tasks/word-numbers/WordNumbers";
import Cities from "./pages/settings/cities/Cities";
import Categories from "./pages/settings/categories/Categories";
import Prices from "./pages/settings/prices/Prices";
import Disciplines from "./pages/settings/disciplines/Disciplines";
import DisciplinesProvider from "./provider/disciplines-provider/DisciplinesProvider";

const Admin: React.FC = () => {
    return <DisciplinesProvider>
        <Router>
            <Layout sidebar={SidebarItems} header={HeaderItems}>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/profile" component={Profile}/>
                    <Route exact path="/franchises" component={Franchises}/>
                    <Route exact path="/franchises/statistic" component={FranchisesStatistic}/>
                    <Route exact path="/franchises/:id" component={Franchise}/>
                    <Route path="/franchises/:franchise_id/centers/:center_id" component={Center}/>

                    <Route path="/directors" component={Directors}/>

                    <Route path="/tasks/countries" component={Countries}/>
                    <Route path="/tasks/personalities" component={Personalities}/>
                    <Route path="/tasks/words" component={Words}/>
                    <Route path="/tasks/digital-picture" component={DigitalPicture}/>
                    <Route path="/tasks/word-numbers" component={WordNumbers}/>

                    <Route path="/settings/cities" component={Cities}/>
                    <Route path="/settings/categories" component={Categories}/>
                    <Route path="/settings/prices" component={Prices}/>
                    <Route path="/disciplines" component={Disciplines}/>
                </Switch>
            </Layout>
        </Router>
    </DisciplinesProvider>
};

export default Admin;