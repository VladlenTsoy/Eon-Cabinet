import React, {useEffect} from 'react';
import {Card, Legend, TablePagination} from "../../../../../../lib/components";
import Columns from "./Columns";
import {useDispatch, useSelector} from "react-redux";
import {studentsSelector} from "../../../../../../store/access/teacher/students/studentSlice";
import {fetchStudentsRecentHomework} from "../../../../../../store/access/teacher/students/recent-homework/fetchStudentsRecentHomework";

const LastExecuted = () => {
    const {recentHomework} = useSelector(studentsSelector)
    const dispatch = useDispatch();

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