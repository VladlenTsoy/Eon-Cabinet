import React from 'react';
import Layout from "lib/layouts/dashboard/Layout";
import HeaderItems from "./layout/header-items/HeaderItems";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Groups from "./pages/groups/list/Groups";
import Group from "./pages/groups/more/Group";
import Student from "./pages/groups/student/Student";
import EditorHomework from "./pages/homework/editor/Editor";
import Homework from "./pages/homework/list/Homework";
import Training from "./pages/training/list/Training";
import TasksSetting from "./pages/training/settings/Settings";
import TasksApplication from "./pages/training/tasks/Tasks";
import Olympiads from "./pages/olympiads/list/Olympiads";
import EditorOlympiad from "./pages/olympiads/editor/Editor";
import MoreOlympiad from "./pages/olympiads/more/More";
import Settings from "./pages/settings/Settings";
import Platform from "./pages/platform/Platform";
import SidebarItems from "./layout/sidebar-items/SidebarItems";
import DisciplinesProvider from "./providers/disciplines-provider/DisciplinesProvider";
import CategoriesProvider from "./providers/categories-provider/CategoriesProvider";
import AlgorithmsProvider from "./providers/algorithms-provider/AlgorithmsProvider";
import AccountItems from "./layout/account-items/AccountItems";

const Index: React.FC = () => {
    return <DisciplinesProvider>
        <CategoriesProvider>
            <AlgorithmsProvider>
                <Router>
                    <Layout header={HeaderItems} sidebar={SidebarItems} account={AccountItems}>
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route path="/profile" component={Profile}/>
                            <Route exact path="/groups" component={Groups}/>
                            <Route exact path="/groups/:id" component={Group}/>
                            <Route path="/groups/:groupId/student/:id" component={Student}/>
                            <Route exact path="/homework" component={Homework}/>
                            <Route path="/homework/create" component={EditorHomework}/>
                            <Route path="/homework/:id/:duplicate" component={EditorHomework}/>
                            <Route path="/homework/:id" component={EditorHomework}/>
                            <Route exact path="/training" component={Training}/>
                            <Route path="/training/:discipline/:task/setting" component={TasksSetting}/>
                            <Route path="/training/:discipline/:task" component={TasksApplication}/>
                            <Route exact path="/olympiad" component={Olympiads}/>
                            <Route path="/olympiad/create" component={EditorOlympiad}/>
                            <Route path="/olympiad/:id" component={MoreOlympiad}/>
                            <Route path="/settings" component={Settings}/>
                            <Route path="/platform" component={Platform}/>
                        </Switch>
                    </Layout>
                </Router>
            </AlgorithmsProvider>
        </CategoriesProvider>
    </DisciplinesProvider>
};

export default Index;