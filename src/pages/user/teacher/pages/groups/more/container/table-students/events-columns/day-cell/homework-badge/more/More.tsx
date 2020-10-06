import React, {useEffect} from "react"
import styled from "styled-components"
import CollapseHomework from "./collapse/Collapse"
import {StudentSentHomework} from "lib/types/teacher/StudentHomework"
import {fetchStudentsHomeworkTasks} from "store/access/teacher/student-homework-tasks/fetchStudentHomeworkTasks"
import {useTeacherDispatch} from "store/access/teacher/store"
import {
    useStudentHomeworkTasksBySentId,
    useLoadingStudentHomeworkTasks
} from "store/access/teacher/student-homework-tasks/studentHomeworkTasksSelectors"
import {LoadingBlock} from "lib/ui"

const MoreStyled = styled.div`
`

interface MoreProps {
    homework: StudentSentHomework
}

const More: React.FC<MoreProps> = ({homework}) => {
    const dispatch = useTeacherDispatch()
    const loading = useLoadingStudentHomeworkTasks()
    const tasks = useStudentHomeworkTasksBySentId(homework.homework.id)

    useEffect(() => {
        const promise = dispatch(fetchStudentsHomeworkTasks({sentId: homework.id}))
        return () => {
            promise.abort()
        }
    }, [dispatch])

    if (loading)
        return <LoadingBlock/>

    return <MoreStyled>
        <CollapseHomework tasks={tasks}/>
    </MoreStyled>
}

export default More