import React from 'react';
import {Route, Switch} from 'react-router-dom';

const Payments = React.lazy(() => import("./payments/Payments"));
const CustomExercises = React.lazy(() => import("./custom-exercises/CustomExercises"));

const Settings: React.FC = () => {
    return <Switch>
        <Route path="/settings/payments" component={Payments}/>
        <Route path="/settings/custom-exercises" component={CustomExercises}/>
    </Switch>;
};

export default Settings;