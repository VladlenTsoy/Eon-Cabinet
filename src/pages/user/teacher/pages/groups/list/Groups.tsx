import React, {useEffect} from 'react';
import {Spin} from "../../../../../../lib/components";
import {useSelector} from "react-redux";
import {fetchGroups} from "../../../../../../store/access/teacher/group/groups/fetchGroups";
import {groupSelector} from "../../../../../../store/access/teacher/group/groupSlice";
import NavButtons from "./nav-buttons/NavButtons";
import Container from "./container/Container";
import {useTeacherDispatch} from "../../../../../../store/access/teacher/store";

const Groups: React.FC = () => {
    const {groups} = useSelector(groupSelector);
    const dispatch = useTeacherDispatch();

    useEffect(() => {
        const promise = dispatch(fetchGroups());
        return () => {
            promise.abort();
        }
    }, [dispatch]);

    return <>
        <NavButtons/>
        <Spin spinning={groups.loading} tip="Загрузка...">
            <Container groups={groups.data}/>
        </Spin>
    </>
};

export default Groups;