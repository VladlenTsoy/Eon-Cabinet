import {useSelector} from "react-redux";
import {TeacherState} from "../store";
import {Homework} from "../../../../lib/types/teacher/Homework";
import {selectAllHomeworkExercises} from "./homeworkExercisesSlice";

// Загрузка упражнений д.з
export const useLoadingHomeworkExercises = () => useSelector((state: TeacherState) => state.homeworkExercises.loading)

// Вывод всех групп
export const useSelectAllHomeworkExercises = () => useSelector(selectAllHomeworkExercises)

//
export const useSelectHomeworkExercisesByHomeworkId = (homeworkId: Homework['id']) => {
    const exercises = useSelectAllHomeworkExercises()
    return exercises.filter(exercise => exercise.homework_id === homeworkId)
}
