import React, {useEffect, useState} from 'react';
import {Legend, LoadingBlock} from "../../../../../../lib/components";
import UsingTablePagination from "../../../../../../lib/components/table-pagination/usingTablePagination";
import Columns from "./Columns";
import {useDispatch, useSelector} from "react-redux";
import {disciplineSelector} from "../../../../../../store/access/teacher/discipline/disciplineSlice";
import {fetchStudentsHomeworkDone} from "../../../../../../store/access/teacher/students/fetchStudentsHomeworkDone";

// TODO - Настроить Props
// interface RecordProps {
//     id: number;
//     student: {
//         id: number;
//         image: string;
//         first_name: string;
//         last_name: string;
//         group: string;
//         group_id: number;
//     };
//     level: number;
//     status: number;
//     sent_at: string;
// }

const LastExecuted = () => {
    const {activeDisciplineId} = useSelector(disciplineSelector)
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        (async () => {
            setLoading(true)
            await dispatch(fetchStudentsHomeworkDone())
            setLoading(false)
        })()
    }, [dispatch])

    return <>
        <Legend>Домашние задания</Legend>
        {loading ? <LoadingBlock/> : <UsingTablePagination
            columns={Columns}
            url={`teacher/${activeDisciplineId}/students/homework/done`}
            isSearch={false}
            isPagination={false}
        />}
    </>;
};

export default LastExecuted;