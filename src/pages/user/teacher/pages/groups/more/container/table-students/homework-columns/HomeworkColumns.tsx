import React from "react";
import ColumnHomework from "./homework/ColumnHomework";
import {Spin} from "antd";
import {StudentHomework} from "../../../../../../../../../store/access/teacher/students/studentsSlice";

interface HomeworkColumnsProps {
    homework: StudentHomework;
    fetchHomeworkLoading: boolean;
}

const HomeworkColumns = ({fetchHomeworkLoading, homework}: HomeworkColumnsProps) => {
    return [
        {
            title: 'Домашние задания',
            className: 'td-homework-table',
            render: (text: any, record: any) => <Spin spinning={fetchHomeworkLoading}>
                <table>
                    <tbody>
                    <tr>
                        {homework && homework[record.id] &&
                            homework[record.id].map((homework: any) =>
                                <ColumnHomework homework={homework} key={homework.id}/>)
                        }
                    </tr>
                    </tbody>
                </table>
            </Spin>
        },
    ]
}

export default HomeworkColumns;