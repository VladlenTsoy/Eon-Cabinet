import React, {useEffect} from 'react';
import {Spin} from "../../../../../../lib/ui";
import {fetchGroups} from "../../../../../../store/access/teacher/group/fetchGroups";
import NavButtons from "./nav-buttons/NavButtons";
import Container from "./container/Container";
import {useTeacherDispatch} from "../../../../../../store/access/teacher/store";
import {useLoadingGroups, useSelectAllGroups} from "../../../../../../store/access/teacher/group/groupSelectors";

const Groups: React.FC = () => {
    const loading = useLoadingGroups()
    const groups = useSelectAllGroups()
    const dispatch = useTeacherDispatch();

    useEffect(() => {
        const promise = dispatch(fetchGroups());
        return () => {
            promise.abort();
        }
    }, [dispatch]);

    return <>
        <NavButtons/>
        <Spin spinning={loading} tip="Загрузка...">
            <Container groups={groups}/>
        </Spin>
    </>
};

export default Groups;