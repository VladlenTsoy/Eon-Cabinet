import React from "react"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import {Loader} from "../lib/ui"
import {useSelector} from "react-redux"
import {userSelector} from "../store/common/user/userSlice"

const Guest = React.lazy(() => import("./guest/index"))
const User = React.lazy(() => import("./user/index"))

const Index = () => {
    const user = useSelector(userSelector)

    return <React.Suspense fallback={<Loader text="Загрузка доступа..." />}>
        <Router>
            <Switch>
                <Route exact path="**" render={() =>
                    user.detail ? <User /> : <Guest />
                } />
            </Switch>
        </Router>
    </React.Suspense>
}

export default Index
