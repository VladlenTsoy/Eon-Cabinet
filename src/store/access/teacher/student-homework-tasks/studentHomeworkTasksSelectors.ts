import {useSelector} from "react-redux"
import {TeacherState} from "../store"
import {selectAllStudentHomeworkTasks} from "./studentHomeworkTasksSlice"

//
export const useLoadingStudentHomeworkTasks = () => useSelector((state: TeacherState) => state.studentHomeworkTasks.loading)

//
export const useAllStudentHomeworkTasks = () => useSelector(selectAllStudentHomeworkTasks)