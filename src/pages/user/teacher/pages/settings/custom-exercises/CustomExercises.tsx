import React from 'react';
import {Route, Switch, useRouteMatch} from "react-router-dom";
import List from "./list/List";
import Editor from "./editor/Editor";

const CustomExercises:React.FC = () => {
    const match = useRouteMatch();

    return <Switch>
        <Route path={`${match.path}/create`} component={Editor}/>
        <Route exact path={`${match.path}/`} component={List}/>
    </Switch>;
};

export default CustomExercises;