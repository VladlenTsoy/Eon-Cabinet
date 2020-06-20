import React, {useEffect, useState} from 'react';
import {Layout, Loader} from "../../../lib";
import HeaderItems from "./layout/header-items/HeaderItems";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Groups from "./pages/groups/list/Groups";
import Group from "./pages/groups/more/Group";
import Student from "./pages/groups/student/Student";
import Homework from "./pages/homework/Homework";
import EditorHomework from "./pages/homework/editor/Editor";
import Training from "./pages/training/list/Training";
import TasksSetting from "./pages/training/settings/Settings";
import TasksApplication from "./pages/training/tasks/Tasks";
import Olympiads from "./pages/olympiads/list/Olympiads";
import EditorOlympiad from "./pages/olympiads/editor/Editor";
import MoreOlympiad from "./pages/olympiads/more/More";
import Settings from "./pages/settings/Settings";
import Platform from "./pages/platform/Platform";
import SidebarItems from "./layout/sidebar-items/SidebarItems";
import {useDispatch, useSelector} from "react-redux";
import {appSelector} from "../../../store/reducers/common/app/appSlice";
import {Spin} from "../../../lib";
import {fetchDisciplines} from "../../../store/reducers/teacher/discipline/fetchDisciplines";
import {fetchCategories} from "../../../store/reducers/teacher/category/fetchCategories";
import {disciplineSelector} from "../../../store/reducers/teacher/discipline/disciplineSlice";
import {fetchAlgorithms} from "../../../store/reducers/teacher/algorithm/fetchAlgorithms";

const TeacherRoutes: React.FC = () => {
    const app = useSelector(appSelector);
    const {activeDisciplineId} = useSelector(disciplineSelector);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    //
    const sidebar = SidebarItems();

    useEffect(() => {
        (async () => {
            setLoading(true);
            await dispatch(fetchDisciplines());
            setLoading(false);
        })();
    }, [dispatch]);

    useEffect(() => {
        (async () => {
            await dispatch(fetchCategories(activeDisciplineId));
            if(Number(activeDisciplineId) === 1)
                await dispatch(fetchAlgorithms());
        })();
    }, [dispatch, activeDisciplineId]);


    if (loading)
        return <Loader text="Загрузка настроек..."/>;

    return <Spin spinning={app.spin} tip="Изменяем тему...">
        <Router>
            <Layout header={HeaderItems} sidebar={sidebar}>
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
    </Spin>;
};

export default TeacherRoutes;