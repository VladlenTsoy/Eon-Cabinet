import React from 'react';
import moment from "moment";
import {Spin} from "antd";
import Empty from "./empty/Empty";
import HomeworkBadge from "./homework-badge/HomeworkBadge";
import Title from "./title/Title";
import {Homework} from "../../../../../../../../../../store/access/teacher/students/homework/homework";

interface DayCellProps {
    day: any;
    loading: boolean;
    events: { [userId: number]: Homework[] } | null | undefined;
}

const DayCell = ({day, events, loading}: DayCellProps) => {
    const today = moment().startOf('day');
    const isToday = moment(day).isSame(today, 'd');
    const week = moment(day).format('e');

    return {
        key: week,
        title: <Title day={day}/>,
        className: `td-events-table td-events-table-${week} ${isToday && 'active'}`,
        render: (_: any, record: any) => {
            return <Spin spinning={loading} data-key={week}>
                {
                    events && events[record.id] ?
                        events[record.id].map((homework, key) =>
                            <HomeworkBadge key={key} homework={homework}/>
                        ) :
                        <Empty/>
                }
            </Spin>
        },
        onHeaderCell: (record: any, rowIndex: any) => ({
            onClick: (event: any) => {
                console.log(event, rowIndex, record)
            }
        })
    };
};

export default DayCell;