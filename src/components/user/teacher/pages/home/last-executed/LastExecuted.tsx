import React from 'react';
import {Legend} from "../../../../../../lib";
import UsingTablePagination from "../../../../../../lib/table-pagination/usingTablePagination";
import Columns from "./Columns";

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
    return <>
        <Legend>Домашние задания</Legend>
        <UsingTablePagination
            columns={Columns}
            url={'/teacher/students/homework/done'}
            isSearch={false}
            isPagination={false}
        />
    </>;
};

export default LastExecuted;