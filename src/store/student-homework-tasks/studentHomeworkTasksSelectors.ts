import {useSelector} from "react-redux"
import {StoreState} from "store"
import {createSelector} from "@reduxjs/toolkit"
import {StudentSentHomeworkTask} from "../../lib/types/teacher/StudentHomework"
import {Homework} from "../../lib/types/teacher/Homework"

//
export const useLoadingStudentHomeworkTasks = () => useSelector((state: StoreState) => state.studentHomeworkTasks.loading)

//
export const useStudentHomeworkTasksBySentId = (homeworkId: Homework['id']) => useSelector(
    createSelector(
        [
            (state: StoreState) => state.studentHomeworkTasks.ids.map(id => state.studentHomeworkTasks.entities[id]) as StudentSentHomeworkTask[]
        ],
        (tasks: StudentSentHomeworkTask[]) => {
            return tasks.filter(task => task.homework_id === homeworkId);
        }
    )
)
