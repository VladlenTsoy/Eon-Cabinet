import React from 'react';
import {Route, Switch} from 'react-router-dom';

const Payments = React.lazy(() => import("./payments/Payments"));
const CustomAlgorithms = React.lazy(() => import("./custom-algorithms/CustomAlgorithms"));

const Settings:React.FC = () => {
    return <Switch>
        <Route path="/settings/payments" component={Payments}/>
        <Route exact path="/settings/custom-algorithms" component={CustomAlgorithms}/>
    </Switch>;
};

export default Settings;