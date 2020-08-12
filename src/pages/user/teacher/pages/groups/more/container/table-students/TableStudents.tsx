import React, {useCallback, useEffect} from "react";
import TableStudentsLayout from "./TableStudents.layout";
import {useDispatch, useSelector} from "react-redux";
import {studentsSelector, nextWeek, prevWeek} from "../../../../../../../../store/access/teacher/students/studentsSlice";
import HomeworkColumns from "./homework-columns/HomeworkColumns";
import DataColumns from "./data-columns/DataColumns";
import DefaultColumns from "./default-columns/DefaultColumns";
import {fetchStudentsHomework} from "../../../../../../../../store/access/teacher/students/homework/fetchStudentsHomework";
import {useParams} from "react-router-dom";
import {ParamsProps} from "../../Group";
import EventsColumns from "./events-columns/EventsColumns";
import {fetchStudentsHomeworkDates} from "../../../../../../../../store/access/teacher/students/homework/fetchStudentsHomeworkDates";

interface TableStudentsProps {
    tab: "details" | "homework" | "events";
    selectUsers: (ids: number[]) => void;
}

const TableStudents: React.FC<TableStudentsProps> = ({tab, selectUsers}) => {
    const {id} = useParams<ParamsProps>();
    const {details, selectedIds, homework} = useSelector(studentsSelector);
    const dispatch = useDispatch();

    const nextAction = useCallback(() => dispatch(nextWeek()), [dispatch])
    const prevAction = useCallback(() => dispatch(prevWeek()), [dispatch])

    useEffect(() => {
        let promise: any;
        const timeout = setTimeout(() => {
            promise = dispatch(fetchStudentsHomeworkDates({groupId: id}))
        }, 500)

        return () => {
            clearTimeout(timeout)
            promise && promise.abort()
        }

    }, [homework.weekState, dispatch])

    const columns = [
        ...DefaultColumns(),
        ...(
            tab === 'homework' ? HomeworkColumns(homework) :
                tab === 'events' ? EventsColumns({dates: homework.dates, next: nextAction, prev: prevAction, loading: homework.loading}) :
                    DataColumns()
        )
    ];

    const rowSelection = {
        selectedRowKeys: selectedIds,
        onChange: (selectedRowKeys: number[]) => selectUsers(selectedRowKeys)
    };

    const checkRowClass = (record: any) => {
        if (record.is_blocked)
            return 'tr-student-block';
        return '';
    };

    useEffect(() => {
        if (tab === 'homework') {
            const promise = dispatch(fetchStudentsHomework({groupId: id}));
            return () => {
                promise.abort();
            }
        }
    }, [dispatch, id, tab]);

    useEffect(() => {
        let parents = document.querySelectorAll('.td-events-table');

        if (parents) {
            parents.forEach(function (parent) {
                parent.addEventListener('mouseenter', function (event) {
                    // @ts-ignore
                    const div = event.currentTarget.querySelector('div')

                    const a = document.querySelectorAll(`.td-events-table-${div.dataset.key}`)
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
                parent.addEventListener('mouseleave', function (event) {
                    // @ts-ignore
                    const div = event.currentTarget.querySelector('div')

                    const a = document.querySelectorAll(`.td-events-table-${div.dataset.key}`)
                    a.forEach(function (value) {
                        // @ts-ignore
                        value.classList.remove("selected")
                    })
                })
            })
        }
    }, [tab]);

    return <TableStudentsLayout
        columns={columns}
        rowKey={(record: any) => record.id}
        scroll={{x: true}}
        dataSource={details.data}
        pagination={false}
        rowSelection={rowSelection}
        rowClassName={checkRowClass}
        loading={details.loading}
    />;
};

export default TableStudents;