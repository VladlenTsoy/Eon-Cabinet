import React, {useEffect} from "react";
import TableStudentsLayout from "./TableStudents.layout";
import {useDispatch, useSelector} from "react-redux";
import {studentsSelector} from "../../../../../../../../store/access/teacher/students/studentsSlice";
import HomeworkColumns from "./homework-columns/HomeworkColumns";
import DataColumns from "./data-columns/DataColumns";
import DefaultColumns from "./default-columns/DefaultColumns";
import {fetchStudentsHomework} from "../../../../../../../../store/access/teacher/students/fetchStudentsHomework";
import {useParams} from "react-router-dom";
import {ParamsProps} from "../../Group";

interface TableStudentsProps {
    tab: "details" | "homework";
    selectUsers: (ids: number[]) => void;
}

const TableStudents: React.FC<TableStudentsProps> = ({tab, selectUsers}) => {
    const {id} = useParams<ParamsProps>();
    const {details, fetchLoading, selectedIds, fetchHomeworkLoading, homework} = useSelector(studentsSelector);
    const dispatch = useDispatch();
    
    const columns = [
        ...DefaultColumns(),
        ...(tab === 'homework' ? HomeworkColumns({fetchHomeworkLoading, homework}) : DataColumns())
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
        if(tab === 'homework') {
            const promise = dispatch(fetchStudentsHomework({groupId: id}));
            return () => {
                promise.abort();
            }
        }
    }, [dispatch, id, tab]);

    return <TableStudentsLayout
        columns={columns}
        rowKey={(record: any) => record.id}
        scroll={{x: true}}
        dataSource={details}
        pagination={false}
        rowSelection={rowSelection}
        rowClassName={checkRowClass}
        loading={fetchLoading}
    />;
};

export default TableStudents;