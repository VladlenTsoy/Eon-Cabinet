import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Disciplines from "./disciplines/Disciplines";

const Payments = React.lazy(() => import("./payments/Payments"));
const CustomExercises = React.lazy(() => import("./custom-exercises/CustomExercises"));

const Settings: React.FC = () => {
    return <Switch>
        <Route exact path="/settings" component={Disciplines}/>
        <React.Suspense fallback={<>Загрузка...</>}>
            <Route path="/settings/payments" component={Payments}/>
            <Route path="/settings/custom-exercises" component={CustomExercises}/>
        </React.Suspense>
    </Switch>
};

export default Settings;