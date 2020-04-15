import React from 'react';
import {Route, Switch, useRouteMatch} from "react-router-dom";
import List from "../custom-exercises/list/List";
import Editor from "../custom-exercises/editor/Editor";

const CustomExercises:React.FC = () => {
    let match = useRouteMatch();
    return <Switch>
        <Route path={`${match.path}/create`} component={Editor}/>
        <Route exact path={`${match.path}/`} component={List}/>
    </Switch>;
};

export default CustomExercises;