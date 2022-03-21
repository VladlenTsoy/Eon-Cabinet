import React, {useEffect} from 'react';
import ExerciseLists
    from "lib/components/exercise-lists/ExerciseLists";
import {LoadingBlock} from "lib/ui";
import {useDispatch} from "store/store";
import {fetchExercisesByHomeworkId} from "store/homework-exercises/fetchExercisesByHomeworkId";
import {
    useLoadingHomeworkExercises,
    useSelectHomeworkExercisesByHomeworkId
} from "store/homework-exercises/homeworkExercisesSelectors";
import {Homework} from "../../../../../../../../../../../../../lib/types/teacher/Homework"

interface ExercisesProps {
    homeworkId: Homework['id'];
}

const Exercises: React.FC<ExercisesProps> = ({homeworkId}) => {
    const exercises = useSelectHomeworkExercisesByHomeworkId(homeworkId)
    const loading = useLoadingHomeworkExercises()
    const dispatch = useDispatch()

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
