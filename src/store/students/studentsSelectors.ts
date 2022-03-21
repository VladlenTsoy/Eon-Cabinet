import {StoreState} from "store";
import {useSelector} from "react-redux";
import {Group} from "../../lib/types/teacher/Group";
import {createSelector} from "@reduxjs/toolkit";

// Загрука учеников
export const useLoadingStudents = () => useSelector((state: StoreState) => state.students.loading)

// Вывод учеников по GroupID
export const useSelectStudentsByGroupId = (groupId: Group['id']) =>
    useSelector(
        createSelector(
            [
                (state: StoreState) => state.students.ids.map(id => state.students.entities[id])
            ],
            (students: any[]) => {
                return students.filter(student => student.group_id === groupId);
            }
        )
    );

// Вывод IDs выбранных учеников
export const useSelectSelectedStudentsByIdsGroupId = (groupId: Group['id']) => useSelector((state: StoreState) => state.students.selectedIds[groupId] || [])
