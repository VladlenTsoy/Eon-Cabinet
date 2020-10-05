import {useSelector} from "react-redux"
import {TeacherState} from "../store"

// Загрука
export const useLoadingStudentHomework = () => useSelector((state: TeacherState) => state.studentHomework.loading)
