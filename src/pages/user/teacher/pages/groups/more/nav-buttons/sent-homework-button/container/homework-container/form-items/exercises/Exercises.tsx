import React, {useEffect} from 'react';
import ExerciseLists
    from "../../../../../../../../homework/editor/tabs-tasks/added-exercises/exercise-lists/ExerciseLists";
import {LoadingBlock} from "../../../../../../../../../../../../lib/components";
import {useTeacherDispatch} from "../../../../../../../../../../../../store/access/teacher/store";
import {fetchExercisesByHomeworkId} from "../../../../../../../../../../../../store/access/teacher/homework/exercises/fetchExercisesByHomeworkId";
import {Homework} from "../../../../../../../../../../../../store/access/teacher/students/homework/homework";
import {useSelector} from "react-redux";
import {homeworkSelector} from "../../../../../../../../../../../../store/access/teacher/homework/homeworkSlice";
import {Empty} from "antd";

interface ExercisesProps {
    homeworkId: Homework['id'] | undefined;
}

const Exercises: React.FC<ExercisesProps> = ({homeworkId}) => {
    const {exercises} = useSelector(homeworkSelector)
    const dispatch = useTeacherDispatch()

    useEffect(() => {
        if (homeworkId) {
            const promise = dispatch(fetchExercisesByHomeworkId({homeworkId: homeworkId}))
            return () => {
                promise.abort()
            }
        }
    }, [dispatch, homeworkId])

    if (!homeworkId)
        return <Empty description="Выберите уровень домашнего задания"/>

    if (exercises.loading)
        return <LoadingBlock title="Загрузка заданий..." maxHeight="250px"/>

    return <>
        {(exercises.data[homeworkId] || []).map((task: any, key: number) =>
            <ExerciseLists exercise={task} key={key}/>
        )}
    </>;
};

export default React.memo(Exercises)