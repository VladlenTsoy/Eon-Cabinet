import React from "react";
import ColumnHomework from "./homework/ColumnHomework";
import {Spin} from "antd";
import {StudentHomework} from "../../../../../../../../../store/access/teacher/students/homework/homework";

interface HomeworkColumnsProps {
    data: StudentHomework;
    loading: boolean;
}

const HomeworkColumns = ({data, loading}: HomeworkColumnsProps) => {
    return [
        {
            title: 'Домашние задания',
            className: 'td-homework-table',
            render: (text: any, record: any) => <Spin spinning={loading}>
                <table>
                    <tbody>
                    <tr>
                        {data && data[record.id] &&
                        data[record.id].map((homework: any) =>
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