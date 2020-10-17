import React, {useCallback, useEffect} from "react"
import {useParams} from "react-router-dom"
import {ParamsProps, TabStudentsType} from "../Group"
import TableStudents from "./table-students/TableStudents"
import {changeSelectedIds} from "../../../../../../../store/access/teacher/students/studentsSlice"
import {fetchStudents} from "../../../../../../../store/access/teacher/students/fetchStudents"
import {useTeacherDispatch} from "../../../../../../../store/access/teacher/store"

interface ContainerProps {
    tab: TabStudentsType
}

const Container: React.FC<ContainerProps> = ({tab}) => {
    const {id} = useParams<ParamsProps>()
    const dispatch = useTeacherDispatch()

    useEffect(() => {
        const promise = dispatch(fetchStudents({groupId: Number(id)}))
        return () => {
            promise.abort()
        }
    }, [dispatch, id])

    const selectUserHandler = useCallback(
        (ids: number[]) => dispatch(changeSelectedIds({groupId: Number(id), ids})),
        [dispatch, id]
    )

    return <TableStudents tab={tab} selectUsers={selectUserHandler} />
}

export default Container
