import React, {useEffect} from 'react';
import {useChangeTitle} from "../../../../../../hooks/use-change-title.effect";
import {useChangeActionNavbar} from "../../../../../../hooks/use-change-action-navbar.effect";
import GroupNavigation from "./nav-buttons/NavButtons";
import {useSelector} from "react-redux";
import {groupSelector} from "../../../../../../store/access/teacher/group/groupSlice";
import {useParams} from "react-router-dom";
import GroupError from "./container/group-error/GroupError";
import {fetchGroup} from "../../../../../../store/access/teacher/group/group/fetchGroup";
import Container from "./container/Container";
import {changeSelectedIds} from "../../../../../../store/access/teacher/students/studentSlice";
import {useTeacherDispatch} from "../../../../../../store/access/teacher/store";

export interface ParamsProps {
    id: string;
}

const Group: React.FC = () => {
    const {id} = useParams<ParamsProps>();
    const {group} = useSelector(groupSelector);
    const dispatch = useTeacherDispatch();

    useChangeActionNavbar({action: '/groups'});
    useChangeTitle({title: group.loading ? 'Группа: Загрузка...' : `Группа: ${group.detail?.title || 'Недоступна'}`});

    useEffect(() => {
        const promise = dispatch(fetchGroup({groupId: Number(id)}));
        return () => {
            promise.abort();
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (group.detail && group.detail.id !== Number(id)) {
            dispatch(changeSelectedIds([]));
        }
    }, [dispatch, group.detail, id]);
    
    if (group.error)
        return <GroupError error={group.error}/>;

    return <>
        <GroupNavigation/>
        <Container/>
    </>;
};

export default Group;