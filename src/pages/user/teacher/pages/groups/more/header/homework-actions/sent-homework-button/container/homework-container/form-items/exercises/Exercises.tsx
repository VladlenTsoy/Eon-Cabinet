import React, {useEffect} from 'react';
import ExerciseLists
    from "lib/components/exercise-lists/ExerciseLists";
import {LoadingBlock} from "lib/ui";
import {useTeacherDispatch} from "store/access/teacher/store";
import {fetchExercisesByHomeworkId} from "store/access/teacher/homework-exercises/fetchExercisesByHomeworkId";
import {StudentHomework} from "store/access/teacher/student-homework/studentHomeworkSlice";
import {
    useLoadingHomeworkExercises,
    useSelectHomeworkExercisesByHomeworkId
} from "store/access/teacher/homework-exercises/homeworkExercisesSelectors";

interface ExercisesProps {
    homeworkId: StudentHomework['id'];
}

const Exercises: React.FC<ExercisesProps> = ({homeworkId}) => {
    const exercises = useSelectHomeworkExercisesByHomeworkId(homeworkId)
    const loading = useLoadingHomeworkExercises()
    const dispatch = useTeacherDispatch()

    useEffect(() => {
        const promise = dispatch(fetchExercisesByHomeworkId({homeworkId: homeworkId}))
        return () => {
            promise.abort()
        }
    }, [dispatch, homeworkId])

    if (loading)
        return <LoadingBlock title="Загрузка заданий..." maxHeight="250px"/>

    return <>
        {exercises.map((exercise, key) =>
            <ExerciseLists exercise={exercise} key={key}/>
        )}
    </>;
};

export default React.memo<ExercisesProps>(Exercises)