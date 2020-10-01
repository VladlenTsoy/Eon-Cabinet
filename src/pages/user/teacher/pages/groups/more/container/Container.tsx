import React, {useCallback, useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import {ParamsProps} from "../Group"
import TableStudents from "./table-students/TableStudents"
import {changeSelectedIds} from "../../../../../../../store/access/teacher/students/studentsSlice"
import {fetchStudents} from "../../../../../../../store/access/teacher/students/fetchStudents"
import {useTeacherDispatch} from "../../../../../../../store/access/teacher/store"
import Header from "../header/Header"

const Container = () => {
    const {id} = useParams<ParamsProps>()
    const dispatch = useTeacherDispatch()
    const [tab, setTab] = useState<"details" | "events">("details")

    useEffect(() => {
        const promise = dispatch(fetchStudents({groupId: Number(id)}))
        return () => {
            promise.abort()
        }
    }, [dispatch, id])

    const selectUserHandler = useCallback(
        (ids: number[]) =>
            dispatch(changeSelectedIds({groupId: Number(id), ids})),
        [dispatch]
    )

    const changeTabHandler = useCallback((val: "details" | "events") => setTab(val), [])

    return (
        <>
            <Header tab={tab} changeTabHandler={changeTabHandler} />
            <TableStudents tab={tab} selectUsers={selectUserHandler} />
        </>
    )
}

export default Container
