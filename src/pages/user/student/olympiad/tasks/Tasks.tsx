import {useRouteMatch} from "react-router-dom";
import React from "react";
import TasksRoutes from "../../../general/tasks/Tasks.routes";

interface MatchProps {
    sentOlympiadId: string;
}

const Tasks: React.FC = () => {
    const {params} = useRouteMatch<MatchProps>();
    const {sentOlympiadId} = params;
    return <TasksRoutes urlBack={`/olympiads/${sentOlympiadId}`} urlRoute="/olympiads/:sentOlympiadId/:taskOlympiadId"/>;
};

export default Tasks;