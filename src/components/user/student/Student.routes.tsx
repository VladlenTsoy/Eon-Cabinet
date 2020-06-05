import React from 'react';
import {Layout} from "../../../lib";
import SidebarItems from "./layouts/sidebar-items/SidebarItems";
import HeaderItems from "./layouts/header-items/HeaderItems";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./home/Home";
import Profile from "./profile/Profile";
import Homework from "./homework/list/Homework";
import More from "./homework/more/More";
import TasksHomework from "./homework/tasks/Tasks";
import Olympiads from "./olympiad/list/Olympiads";
import Olympiad from "./olympiad/more/Olympiad";
import TasksOlympiad from "./olympiad/tasks/Tasks";
import Result from "../general/tasks/layouts/result/olympiad/Result";
import {Spin} from "../../../layouts/components";
import {useSelector} from "react-redux";

const StudentRoutes = () => {
    const {app} = useSelector((state: any) => (state));
    return <Spin spinning={app.spin} tip="Изменяем тему...">
        <Router>
            <Layout sidebar={SidebarItems} header={HeaderItems}>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/profile" component={Profile}/>
                    <Route exact path="/homework" component={Homework}/>
                    <Route exact path="/homework/:id" component={More}/>
                    <Route path="/homework/:homeworkId/:id/:disciplineId/:taskId" component={TasksHomework}/>
                    <Route exact path="/olympiads" component={Olympiads}/>
                    <Route exact path="/olympiads/:olympiadId" component={Olympiad}/>
                    <Route path="/olympiads/:sentOlympiadId/:taskOlympiadId/:disciplineId/:taskId"
                           component={TasksOlympiad}/>
                    <Route path="/result" component={Result}/>
                </Switch>
            </Layout>
        </Router>
    </Spin>;
};

export default StudentRoutes;