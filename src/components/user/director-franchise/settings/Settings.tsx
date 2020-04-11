import React from 'react';
import {Route, Switch} from "react-router-dom";
import FranchiseSetting from "./fracnhise/FracnhiseSetting";
import FormulTitleSetting from "./formul-title/FormulTitleSetting";
import ServicesSetting from "./services/ServicesSetting";
import TaskTitleSetting from "./task-title/TaskTitleSetting";
import CategoriesFromFranchise from "./categories/Categories";

const Settings: React.FC<any> = () => {
    return <Switch>
            <Route path="/settings/franchise" component={FranchiseSetting}/>
            <Route path="/settings/formul-title" component={FormulTitleSetting}/>
            <Route path="/settings/task-title" component={TaskTitleSetting}/>
            <Route path="/settings/services" component={ServicesSetting}/>
            <Route path="/settings/categories" component={CategoriesFromFranchise}/>
        </Switch>;
};

export default Settings;