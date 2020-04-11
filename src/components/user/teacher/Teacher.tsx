import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from "./home/Home";
import Profile from "./profile/Profile";
import Groups from "./groups/list/Groups";
import Group from "./groups/more/Group";
import Training from "./training/list/Training";
import Student from "./groups/student/Student";
import Homework from "./homework/Homework";
import EditorHomework from "./homework/editor/Editor";
import TasksSetting from "./training/tasks/Tasks";
import Settings from "./settings/Settings";
import TasksApplication from "../general/tasks/Tasks";
import {Layout, Loader} from "lib";
import SidebarItems from "./layout/sidebar-items/SidebarItems";
import HeaderItems from "./layout/header-items/HeaderItems";
import {appChangeBasicSettings} from "../../../store/app/actions";
import Olympiads from "./olympiads/list/Olympiads";
import EditorOlympiad from "./olympiads/editor/Editor";
import MoreOlympiad from "./olympiads/more/More";
import HistoryOlympiad from "./olympiads/history/HistoryOlympiad";
import {useApiUserGeneral} from "../../../effects/use-api-user-general.effect";
import {useDispatch} from "react-redux";
import Platform from "./platform/Platform";

const Teacher: React.FC = () => {
    const dispatch = useDispatch();
    const [loading] = useApiUserGeneral({
        url: '/teacher/basic-settings',
        afterRequest: async (data) => await dispatch(appChangeBasicSettings(data))
    });

    const sidebar = SidebarItems();

    return !loading ? <Router>
            <Layout header={HeaderItems} sidebar={sidebar}>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/profile" component={Profile}/>
                    <Route exact path="/groups" component={Groups}/>
                    <Route exact path="/groups/:id" component={Group}/>
                    <Route path="/groups/:groupId/student/:id" component={Student}/>
                    <Route exact path="/homework" component={Homework}/>
                    <Route path="/homework/create" component={EditorHomework}/>
                    <Route path="/homework/:id" component={EditorHomework}/>
                    <Route exact path="/training" component={Training}/>
                    <Route path="/training/:discipline/:task/setting" component={TasksSetting}/>
                    <Route path="/training/:discipline/:task" component={TasksApplication}/>
                    <Route exact path="/olympiad" component={Olympiads}/>
                    <Route path="/olympiad/create" component={EditorOlympiad}/>
                    <Route path="/olympiad/history" component={HistoryOlympiad}/>
                    <Route path="/olympiad/:id" component={MoreOlympiad}/>
                    <Route path="/settings" component={Settings}/>
                    <Route path="/platform" component={Platform}/>
                </Switch>
            </Layout>
        </Router> :
        <Loader text="Загрузка настроек..."/>
};

export default Teacher;