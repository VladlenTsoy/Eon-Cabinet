import React, {useEffect} from 'react';
import {Spin} from "../../../../../../lib";
import {useDispatch, useSelector} from "react-redux";
import {fetchGroups} from "../../../../../../store/reducers/teacher/group/fetchGroups";
import {groupSelector} from "../../../../../../store/reducers/teacher/group/groupSlice";
import {disciplineSelector} from "../../../../../../store/reducers/teacher/discipline/disciplineSlice";
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