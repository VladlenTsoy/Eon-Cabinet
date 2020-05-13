import React from "react";
import {useRouteMatch} from "react-router-dom";
import TasksRoutes from "../../../general/tasks/Tasks.routes";

interface MatchProps {
    homeworkId: string;
}

const Tasks: React.FC = () => {
    const {params} = useRouteMatch<MatchProps>();
    const {homeworkId} = params;
    return <TasksRoutes urlBack={`/homework/${homeworkId}`} urlRoute="/homework/:homeworkId/:id"/>
};

export default Tasks;