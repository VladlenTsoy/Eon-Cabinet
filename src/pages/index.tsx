import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import ReactGA from "react-ga";
import {Loader} from "../lib/components";
import {useSelector} from "react-redux";
import {userSelector} from "../store/common/user/userSlice";
import "../styles/style.less";

const Guest = React.lazy(() => import("./guest/index"));
const User = React.lazy(() => import("./user/User"));

const Index = () => {
    const user = useSelector(userSelector);

    useEffect(() => {
        if (process.env.NODE_ENV === 'production')
            window.onload = () => {
                ReactGA.initialize('UA-129675719-1');
                ReactGA.pageview(window.location.pathname + window.location.search);
            }
    }, []);

    // Fetch language and current user data
    return <React.Suspense fallback={<Loader text="Загрузка доступа..."/>}>
        <Router>
            <Switch>
                <Route exact path="**" render={() =>
                    user.detail ? <User/> : <Guest/>
                }/>
            </Switch>
        </Router>
    </React.Suspense>
};

export default Index;