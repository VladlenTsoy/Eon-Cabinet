import React from "react";
import {useParams} from "react-router-dom";
import TasksRoutes from "../../../../general/tasks/Tasks.routes";

interface MatchProps {
    homeworkId: string;
}

const Tasks: React.FC = () => {
    const {homeworkId} = useParams<MatchProps>();
    return <TasksRoutes urlBack={`/homework/${homeworkId}`} urlRoute="/homework/:homeworkId/:id"/>
};

export default Tasks;