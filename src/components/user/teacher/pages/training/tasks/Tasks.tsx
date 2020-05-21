import React from 'react';
import TasksRoutes from "../../../../general/tasks/Tasks.routes";
import {useRouteMatch} from "react-router-dom";

const Tasks = () => {
    const {params} = useRouteMatch();
    const {discipline, task} = params;
    return <TasksRoutes urlBack={`/training/${discipline}/${task}/setting`} urlRoute={'/training'}/>;
};

export default Tasks;