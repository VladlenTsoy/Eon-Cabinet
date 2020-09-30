import React, {useCallback, useEffect} from "react"
import TableStudentsLayout from "./TableStudents.layout"
import {useSelector} from "react-redux"
import {
    studentsSelector,
    nextWeek,
    prevWeek
} from "../../../../../../../../store/access/teacher/students/studentsSlice"
import DataColumns from "./data-columns/DataColumns"
import DefaultColumns from "./default-columns/DefaultColumns"
import {useParams} from "react-router-dom"
import {ParamsProps} from "../../Group"
import EventsColumns from "./events-columns/EventsColumns"
import {fetchStudentsHomeworkDates} from "../../../../../../../../store/access/teacher/students/homework/fetchStudentsHomeworkDates"
import {useTeacherDispatch} from "../../../../../../../../store/access/teacher/store"
import {
    useSelectStudentsByGroupId,
    useLoadingStudents,
    useSelectSelectedStudentsByIdsGroupId
} from "../../../../../../../../store/access/teacher/students/studentsSelectors"

interface TableStudentsProps {
    tab: "details" | "homework" | "events"
    selectUsers: (ids: number[]) => void
}

const TableStudents: React.FC<TableStudentsProps> = ({tab, selectUsers}) => {
    const {id} = useParams<ParamsProps>()
    const {homework} = useSelector(studentsSelector)
    const dispatch = useTeacherDispatch()

    const loading = useLoadingStudents()
    const selectedIds = useSelectSelectedStudentsByIdsGroupId(Number(id))
    const students = useSelectStudentsByGroupId(Number(id))

    const nextAction = useCallback(() => dispatch(nextWeek()), [dispatch])
    const prevAction = useCallback(() => dispatch(prevWeek()), [dispatch])

    useEffect(() => {
        let promise: any
        const timeout = setTimeout(() => {
            promise = dispatch(
                fetchStudentsHomeworkDates({groupId: Number(id)})
            )
        }, 500)

        return () => {
            clearTimeout(timeout)
            promise && promise.abort()
        }
    }, [homework.weekState, dispatch])

    const columns = [
        ...DefaultColumns(),
        ...(tab === "events"
            ? EventsColumns({
                  dates: homework.dates,
                  next: nextAction,
                  prev: prevAction,
                  loading: homework.loading
              })
            : DataColumns())
    ]

    const rowSelection = {
        selectedRowKeys: selectedIds,
        onChange: (selectedRowKeys: number[]) => selectUsers(selectedRowKeys)
    }

    const checkRowClass = (record: any) => {
        if (record.is_blocked) return "tr-student-block"
        return ""
    }

    useEffect(() => {
        let parents = document.querySelectorAll(".td-events-table")

        if (parents) {
            parents.forEach(function (parent) {
                parent.addEventListener("mouseenter", function (event) {
                    // @ts-ignore
                    const div = event.currentTarget.querySelector("div")

                    const a = document.querySelectorAll(
                        `.td-events-table-${div.dataset.key}`
                    )
                    a.forEach(function (value) {
                        // @ts-ignore
                        value.classList.add("selected")
                    })
                })
            })
            // parents.forEach(function (parent) {
            //     parent.addEventListener('click', function (event) {
            //         // @ts-ignore
            //         console.log(event.target.tagName)
            //         // @ts-ignore
            //         const div = event.currentTarget.querySelector('div')
            //         alert(div.dataset.key);
            //     })
            // })
            parents.forEach(function (parent) {
                parent.addEventListener("mouseleave", function (event) {
                    // @ts-ignore
                    const div = event.currentTarget.querySelector("div")

                    const a = document.querySelectorAll(
                        `.td-events-table-${div.dataset.key}`
                    )
                    a.forEach(function (value) {
                        // @ts-ignore
                        value.classList.remove("selected")
                    })
                })
            })
        }
    }, [tab])

    return (
            <TableStudentsLayout
                columns={columns}
                rowKey={(record: any) => record.id}
                scroll={{x: true}}
                dataSource={students}
                pagination={false}
                rowSelection={rowSelection}
                rowClassName={checkRowClass}
                loading={loading}
            />
    )
}

export default TableStudents
