import React from 'react';
import {Legend} from "../../../../../../lib";
import UsingTablePagination from "../../../../../../lib/table-pagination/usingTablePagination";
import Columns from "./Columns";
import {useSelector} from "react-redux";
import {disciplineSelector} from "../../../../../../store/reducers/teacher/discipline/disciplineSlice";

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
    const {activeDisciplineId} = useSelector(disciplineSelector);
    return <>
        <Legend>Домашние задания</Legend>
        <UsingTablePagination
            columns={Columns}
            url={`teacher/${activeDisciplineId}/students/homework/done`}
            isSearch={false}
            isPagination={false}
        />
    </>;
};

export default LastExecuted;