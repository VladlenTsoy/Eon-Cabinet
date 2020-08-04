import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ForgotPassword from "./forgot/Forgot";
import Login from "./login/Login";
import Registration from "./registration/Registration";

const Auth: React.FC = () =>
    <Router>
        <Switch>
            <Route exact path="/" component={Login}/>
            <Route path="/registration" component={Registration}/>
            <Route path="/forgot-password" component={ForgotPassword}/>
            <Route component={Login}/>
        </Switch>
    </Router>

export default Auth;