import React, {useCallback, useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import {ParamsProps} from "../Group"
import TableStudents from "./table-students/TableStudents"
import {changeSelectedIds} from "../../../../../../../store/access/teacher/students/studentsSlice"
import styled from "styled-components"
import {fetchStudents} from "../../../../../../../store/access/teacher/students/fetchStudents"
import {useTeacherDispatch} from "../../../../../../../store/access/teacher/store"
import Header from "../header/Header"

const ContainerStyled = styled.div`
    max-width: ${(props) => props.theme.maxWidth};
    margin: 0 auto;
    width: 100%;
    height: 100%;
    background: ${(props) => props.theme["@component-background"]};
    padding: 1.5rem 1rem;
`

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
        <ContainerStyled>
            <Header tab={tab} changeTabHandler={changeTabHandler} />
            <TableStudents tab={tab} selectUsers={selectUserHandler} />
        </ContainerStyled>
    )
}

export default Container
