import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchStudentsHomework} from "../../../../../../../store/reducers/teacher/students/fetchStudentsHomework";
import {useParams} from "react-router-dom";
import {ParamsProps} from "../Group";
import TableStudents from "./table-students/TableStudents";
import {studentsSelector, changeSelectedIds} from "../../../../../../../store/reducers/teacher/students/studentsSlice";

const Container = () => {
    const {id} = useParams<ParamsProps>();
    const dispatch = useDispatch();
    const students = useSelector(studentsSelector);

    useEffect(() => {
        const promise = dispatch(fetchStudentsHomework({groupId: id}));
        return () => {
            promise.abort();
        }
    }, [dispatch, id]);

    const selectUserHandler = useCallback((ids: number[]) => dispatch(changeSelectedIds(ids)), [dispatch])

    return <>
        <TableStudents
            users={students.homework}
            selectUsersId={students.selectedIds}
            selectUsers={selectUserHandler}
            loading={students.fetchLoading}
            fetchUsers={() => null}
        />
    </>;
};

export default Container;