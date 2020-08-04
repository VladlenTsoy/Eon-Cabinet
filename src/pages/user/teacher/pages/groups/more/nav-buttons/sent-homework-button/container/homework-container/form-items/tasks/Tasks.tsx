import React from 'react';
import ExerciseLists
    from "../../../../../../../../homework/editor/tabs-tasks/added-exercises/exercise-lists/ExerciseLists";
import {LoadingBlock} from "../../../../../../../../../../../../lib/components";
import {useApiUserGeneral} from "../../../../../../../../../../../../hooks/use-api-user-general.effect";

interface TasksProps {
    homeworkId: number;
}

const Tasks: React.FC<TasksProps> = ({homeworkId}) => {
    const [loadingTasks, tasks] = useApiUserGeneral({url: `/teacher/tasks/homework/${homeworkId}`, initValue: []})

    if (loadingTasks)
        return <LoadingBlock title="Загрузка заданий..." maxHeight="250px"/>;

    return <>
        {tasks.map((task: any, key: number) =>
            <ExerciseLists exercise={task} key={key}/>
        )}
    </>;
};

export default Tasks;