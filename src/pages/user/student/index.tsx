import React from "react"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Home from "./pages/home/Home"
import Profile from "./pages/profile/Profile"
import Homework from "./pages/homework/list/Homework"
import More from "./pages/homework/more/More"
import TasksHomework from "./pages/homework/tasks/Tasks"
import Olympiads from "./pages/olympiad/list/Olympiads"
import Olympiad from "./pages/olympiad/more/Olympiad"
import TasksOlympiad from "./pages/olympiad/tasks/Tasks"
import Result from "../general/tasks/layouts/result/olympiad/Result"
import FacebookLayout from "../../../lib/layouts/facebook/FacebookLayout"
import CoinNotification from "./layouts/_old/notifications/coin/CoinNotification"
import {HeaderItems} from "./layouts/laptop/header-items/HeaderItems"
import {SidebarItems} from "./layouts/laptop/sidebar-items/SidebarItems"
import {AccountItems} from "./layouts/laptop/account-items/AccountItems"

const Index = () => {
    return (
        <Router>
            <Switch>
                <FacebookLayout
                    navigations={HeaderItems}
                    sidebars={SidebarItems}
                    accountMenu={AccountItems}
                >
                    <Route exact path="/" component={Home} />
                    <Route path="/profile" component={Profile} />
                    <Route exact path="/homework" component={Homework} />
                    <Route exact path="/homework/:id" component={More} />
                    <Route
                        path="/homework/:homeworkId/:id/:disciplineId/:taskId"
                        component={TasksHomework}
                    />
                    <Route exact path="/olympiads" component={Olympiads} />
                    <Route
                        exact
                        path="/olympiads/:olympiadId"
                        component={Olympiad}
                    />
                    <Route
                        path="/olympiads/:sentOlympiadId/:taskOlympiadId/:disciplineId/:taskId"
                        component={TasksOlympiad}
                    />
                    <Route path="/result" component={Result} />
                </FacebookLayout>
                {/* --------------- */}
                <CoinNotification />
            </Switch>
        </Router>
    )
}

export default Index
