import React from 'react';
import {Route, Switch, useRouteMatch} from 'react-router-dom';
import List from "./list/List";
import Editor from "./editor/Editor";

const CustomAlgorithms: React.FC = () => {
    let match = useRouteMatch();
    return <Switch>
        <Route exact path={`${match.path}`} component={List}/>
        <Route exact path={`${match.path}/create`} component={Editor}/>
    </Switch>;
};

export default CustomAlgorithms;