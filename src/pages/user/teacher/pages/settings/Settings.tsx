import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Disciplines from "./disciplines/Disciplines";

const Payments = React.lazy(() => import("./payments/Payments"));
const CustomExercises = React.lazy(() => import("./custom-exercises/CustomExercises"));

const Settings: React.FC = () => {
    return <Switch>
        <React.Suspense fallback={<>Загрузка...</>}>
            <Route path="/settings/payments" component={Payments}/>
            <Route path="/settings/custom-exercises" component={CustomExercises}/>
        </React.Suspense>
        <Route path="/settings/disciplines" component={Disciplines}/>
    </Switch>
};

export default Settings;