import React, {useEffect} from 'react';
import {Spin} from "../../../../../../lib/components";
import {useDispatch, useSelector} from "react-redux";
import {fetchGroups} from "../../../../../../store/access/teacher/group/groups/fetchGroups";
import {groupSelector} from "../../../../../../store/access/teacher/group/groupSlice";
import NavButtons from "./nav-buttons/NavButtons";
import Container from "./container/Container";

const Groups: React.FC = () => {
    const {groups} = useSelector(groupSelector);
    const dispatch = useDispatch();

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