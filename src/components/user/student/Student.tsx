import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Layout} from "lib";
import SidebarItems from "./layouts/sidebar-items/SidebarItems";
import HeaderItems from "./layouts/header-items/HeaderItems";
import Home from "./home/Home";
import Profile from "./profile/Profile";
import Homework from "./homework/list/Homework";
import More from "./homework/more/More";
import Tasks from "./homework/tasks/Tasks";
import TasksOlympiad from "./olympiad/tasks/Tasks";
import Olympiads from "./olympiad/list/Olympiads";
import Olympiad from "./olympiad/more/Olympiad";
import Result from "./olympiad/tasks/layouts/result/Result";

const Student = () => <Router>
    <Layout sidebar={SidebarItems} header={HeaderItems}>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/profile" component={Profile}/>
            <Route exact path="/homework" component={Homework}/>
            <Route exact path="/homework/:id" component={More}/>
            <Route path="/homework/:homeworkId/:id/:taskId" component={Tasks}/>
            <Route exact path="/olympiads" component={Olympiads}/>
            <Route exact path="/olympiads/:olympiadId" component={Olympiad}/>
            <Route path="/olympiads/:disciplineId/:sentOlympiadId/:taskOlympiadId/:taskId" component={TasksOlympiad}/>
            <Route path="/result" component={Result}/>
        </Switch>
    </Layout>
</Router>;

export default Student;