import React from "react";
import {useParams} from "react-router-dom";
import TasksRoutes from "../../../user/general/tasks/Tasks.routes";

interface MatchProps {
    homeworkId: string;
}

const Tasks: React.FC = () => {
    const {homeworkId} = useParams<MatchProps>();
    return <TasksRoutes urlBack={`/guest/homework/${homeworkId}`} urlRoute="/guest/homework/:homeworkId/:id"/>
};

export default Tasks;