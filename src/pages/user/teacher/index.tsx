import React from "react"
import SidebarItems from "./layout/sidebar-items/SidebarItems"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import {Navigations} from "./layout/navigation-items/NavigationItems"
import DisciplinesProvider from "./providers/disciplines-provider/DisciplinesProvider"
import CategoriesProvider from "./providers/categories-provider/CategoriesProvider"
import AlgorithmsProvider from "./providers/algorithms-provider/AlgorithmsProvider"
import AccountItems from "./layout/account-items/AccountItems"
import FacebookLayout from "../../../lib/layouts/facebook/FacebookLayout"
import {LoadingBlock} from "../../../lib/ui"

const Home = React.lazy(() => import("./pages/home/Home"));
const Profile = React.lazy(() => import("./pages/profile/Profile"));
const Groups = React.lazy(() => import("./pages/groups/list/Groups"));
const Group = React.lazy(() => import("./pages/groups/more/Group"));
const EditorHomework = React.lazy(() => import("./pages/homework/editor/Editor"));
const Homework = React.lazy(() => import("./pages/homework/list/Homework"));
const Training = React.lazy(() => import("./pages/training/list/Training"));
const TasksSetting = React.lazy(() => import("./pages/training/settings/Settings"));
const TasksApplication = React.lazy(() => import("./pages/training/tasks/Tasks"));
const Olympiads = React.lazy(() => import("./pages/olympiads/list/Olympiads"));
const EditorOlympiad = React.lazy(() => import("./pages/olympiads/editor/Editor"));
const MoreOlympiad = React.lazy(() => import("./pages/olympiads/more/More"));
const Settings = React.lazy(() => import("./pages/settings/Settings"));
const Platform = React.lazy(() => import("./pages/platform/Platform"));

const Index: React.FC = () => {
    return <DisciplinesProvider>
        <CategoriesProvider>
            <AlgorithmsProvider>
                <Router>
                    <FacebookLayout sidebars={SidebarItems} navigations={Navigations} accountMenu={AccountItems}>
                        <React.Suspense fallback={<LoadingBlock title="Загрузка страницы..."/>}>
                            <Switch>
                                <Route exact path="/" component={Home}/>
                                <Route path="/profile" component={Profile}/>
                                <Route exact path="/groups" component={Groups}/>
                                <Route exact path="/groups/:id" component={Group}/>
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
                        </React.Suspense>
                    </FacebookLayout>
                </Router>
            </AlgorithmsProvider>
        </CategoriesProvider>
    </DisciplinesProvider>
}

export default Index