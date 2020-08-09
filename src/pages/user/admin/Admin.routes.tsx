import React from 'react';
import {useSelector} from "react-redux";
import {Spin} from "../../../lib/components";
import {Loader} from "../../../lib/components";
import Layout from "lib/layouts/dashboard/Layout";
import SidebarItems from "./layouts/sidebar-items/SidebarItems";
import HeaderItems from "./layouts/header-items/HeaderItems";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./home/Home";
import Profile from "./profile/Profile";
import Franchises from "./franchises/Franchises";
import FranchisesStatistic from "./franchises-statistic/FranchisesStatistic";
import Franchise from "./franchise/Franchise";
import Center from "./center/Center";
import Directors from "./directors/Directors";
import Countries from "./tasks/countries/Countries";
import Personalities from "./tasks/personalities/Personalities";
import Words from "./tasks/words/Words";
import DigitalPicture from "./tasks/digital-pictures/DigitalPicture";
import WordNumbers from "./tasks/word-numbers/WordNumbers";
import Cities from "./settings/cities/Cities";
import Categories from "./settings/categories/Categories";
import Prices from "./settings/prices/Prices";
import Disciplines from "./settings/disciplines/Disciplines";
import {useApiUserGeneral} from "../../../hooks/use-api-user-general.effect";

const AdminRoutes = () => {
    const {app} = useSelector((state: any) => (state));
    // const dispatch = useDispatch();
    const [loading] = useApiUserGeneral({
        url: '/admin/disciplines',
        // afterRequest: async (data) => await dispatch(changeDisciplines(data))
    });

    if (loading)
        return <Loader text="Загрузка настроек..."/>;

    return <Spin spinning={app.spin} tip="Изменяем тему...">
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
    </Spin>
};

export default AdminRoutes;