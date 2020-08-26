import {TeacherState} from "../store";
import {useSelector} from "react-redux";
import {getStudentById} from "./studentsSlice";
import {Student} from "../../../../lib/types/teacher/Student";
import {Group} from "../../../../lib/types/teacher/Group";
import {createSelector} from "@reduxjs/toolkit";

// Загрука учеников
export const useLoadingStudents = () => useSelector((state: TeacherState) => state.students.loading)

// Вывод ученика по ID
export const useSelectStudentById = (id: Student['id']) => useSelector((state: TeacherState) => getStudentById(state, Number(id)))

// Вывод учеников по GroupID
export const useSelectStudentsByGroupId = (groupId: Group['id']) =>
    useSelector(
        createSelector(
            [
                (state: TeacherState) => state.students.ids.map(id => state.students.entities[id])
            ],
            (students: any[]) => {
                return students.filter(student => student.group_id === groupId);
            }
        )
    );


// Вывод IDs выбранных учеников
export const useSelectSelectedStudentsByIdsGroupId = (groupId: Group['id']) => useSelector((state: TeacherState) => state.students.selectedIds[groupId] || [])