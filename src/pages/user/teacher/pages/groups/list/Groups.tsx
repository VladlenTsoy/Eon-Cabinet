import React, {useEffect} from 'react';
import {Spin} from "../../../../../../lib/components";
import {useDispatch, useSelector} from "react-redux";
import {fetchGroups} from "../../../../../../store/access/teacher/group/fetchGroups";
import {groupSelector} from "../../../../../../store/access/teacher/group/groupSlice";
import {disciplineSelector} from "../../../../../../store/access/teacher/discipline/disciplineSlice";
import NavButtons from "./nav-buttons/NavButtons";
import Container from "./container/Container";

const Groups: React.FC = () => {
    const {activeDisciplineId} = useSelector(disciplineSelector);
    const {groups, fetchLoading} = useSelector(groupSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        const promise = dispatch(fetchGroups({activeDisciplineId}));
        return () => {
            promise.abort();
        }
    }, [activeDisciplineId, dispatch]);

    return <>
        <NavButtons/>
        <Spin spinning={fetchLoading} tip="Загрузка...">
            <Container groups={groups}/>
        </Spin>
    </>
};

export default Groups;