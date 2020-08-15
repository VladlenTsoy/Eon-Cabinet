import React, {useEffect} from 'react';
import ExerciseLists
    from "../../../../../../../../homework/editor/tabs-tasks/added-exercises/exercise-lists/ExerciseLists";
import {LoadingBlock} from "../../../../../../../../../../../../lib/components";
import {useTeacherDispatch} from "../../../../../../../../../../../../store/access/teacher/store";
import {fetchTasksByHomeworkId} from "../../../../../../../../../../../../store/access/teacher/homework/tasks/fetchTasksByHomeworkId";
import {Homework} from "../../../../../../../../../../../../store/access/teacher/students/homework/homework";
import {useSelector} from "react-redux";
import {homeworkSelector} from "../../../../../../../../../../../../store/access/teacher/homework/homeworkSlice";

interface TasksProps {
    homeworkId: Homework['id'];
}

const Tasks: React.FC<TasksProps> = ({homeworkId}) => {
    const {tasks} = useSelector(homeworkSelector)
    const dispatch = useTeacherDispatch()

    useEffect(() => {
        const promise = dispatch(fetchTasksByHomeworkId({homeworkId: homeworkId}))
        return () => {
            promise.abort()
        }
    }, [dispatch])

    if (tasks.loading)
        return <LoadingBlock title="Загрузка заданий..." maxHeight="250px"/>;

    return <>
        {(tasks.data[homeworkId] || []).map((task: any, key: number) =>
            <ExerciseLists exercise={task} key={key}/>
        )}
    </>;
};

export default React.memo(Tasks);