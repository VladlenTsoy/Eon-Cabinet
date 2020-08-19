import React, {useEffect} from 'react';
import {Card, Legend, TablePagination} from "../../../../../../lib/ui";
import Columns from "./Columns";
import {useSelector} from "react-redux";
import {studentsSelector} from "../../../../../../store/access/teacher/students/studentsSlice";
import {fetchStudentsRecentHomework} from "../../../../../../store/access/teacher/students/recent-homework/fetchStudentsRecentHomework";
import {useTeacherDispatch} from "../../../../../../store/access/teacher/store";

const LastExecuted = () => {
    const {recentHomework} = useSelector(studentsSelector)
    const dispatch = useTeacherDispatch();

    useEffect(() => {
        const promise = dispatch(fetchStudentsRecentHomework({}))
        return () => {
            promise.abort()
        }
    }, [dispatch])

    return <>
        <Legend>Домашние задания</Legend>
        <Card>
            <TablePagination
                loading={recentHomework.loading}
                data={recentHomework.data}
                pagination={false}
                columns={Columns()}
                fetch={() => null}
            />
        </Card>
    </>;
};

export default LastExecuted;