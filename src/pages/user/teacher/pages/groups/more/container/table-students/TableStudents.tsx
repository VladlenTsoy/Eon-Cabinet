import React from "react"
import TableStudentsLayout from "./TableStudents.layout"
import {useSelector} from "react-redux"
import DataColumns from "./data-columns/DataColumns"
import DefaultColumns from "./default-columns/DefaultColumns"
import {useParams} from "react-router-dom"
import {ParamsProps, TabStudentsType} from "../../Group"
import EventsColumns from "./events-columns/EventsColumns"
import {
    useSelectStudentsByGroupId,
    useLoadingStudents,
    useSelectSelectedStudentsByIdsGroupId
} from "../../../../../../../../store/access/teacher/students/studentsSelectors"
import {useHomeworkDates} from "../useHomeworkDates"
import {studentHomeworkSelector} from "../../../../../../../../store/access/teacher/student-homework/studentHomeworkSlice"

interface TableStudentsProps {
    tab: TabStudentsType
    selectUsers: (ids: number[]) => void
}

const TableStudents: React.FC<TableStudentsProps> = ({tab, selectUsers}) => {
    const {id} = useParams<ParamsProps>()
    const homework = useSelector(studentHomeworkSelector)

    // Студенты
    const loading = useLoadingStudents()
    const selectedIds = useSelectSelectedStudentsByIdsGroupId(Number(id))
    const students = useSelectStudentsByGroupId(Number(id))

    // Календарь
    const {nextAction, prevAction} = useHomeworkDates({tab, homework, id})

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
