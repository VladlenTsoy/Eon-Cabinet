import React, {useEffect} from 'react';
import {useChangeTitle} from "../../../../../../hooks/use-change-title.effect";
import {useChangeActionNavbar} from "../../../../../../hooks/use-change-action-navbar.effect";
import GroupNavigation from "./nav-buttons/NavButtons";
import {useDispatch, useSelector} from "react-redux";
import {groupSelector} from "../../../../../../store/access/teacher/group/groupSlice";
import {useParams} from "react-router-dom";
import GroupError from "./container/group-error/GroupError";
import {fetchGroup} from "../../../../../../store/access/teacher/group/fetchGroup";
import Container from "./container/Container";
import {changeSelectedIds} from "../../../../../../store/access/teacher/students/studentsSlice";

export interface ParamsProps {
    id: string;
}

const Group: React.FC = () => {
    const {id} = useParams<ParamsProps>();
    const {fetchLoading, fetchError, group} = useSelector(groupSelector);
    const dispatch = useDispatch();

    useChangeActionNavbar({action: '/groups'});
    useChangeTitle({title: fetchLoading ? 'Группа: Загрузка...' : `Группа: ${group?.title || 'Недоступна'}`});

    useEffect(() => {
        const promise = dispatch(fetchGroup({groupId: id}));
        return () => {
            promise.abort();
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (group && group.id !== Number(id)) {
            dispatch(changeSelectedIds([]));
        }
    }, [dispatch, group, id]);
    
    if (fetchError)
        return <GroupError error={fetchError}/>;

    return <>
        <GroupNavigation/>
        <Container/>
    </>;
};

export default Group;