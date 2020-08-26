import React, {useEffect} from 'react';
import {useChangeTitle} from "../../../../../../hooks/use-change-title.effect";
import {useChangeActionNavbar} from "../../../../../../hooks/use-change-action-navbar.effect";
import GroupNavigation from "./nav-buttons/NavButtons";
import {useParams} from "react-router-dom";
import Container from "./container/Container";
import {useTeacherDispatch} from "../../../../../../store/access/teacher/store";
import NotFound from "../../../../../errors/404";
import {useLoadingGroups, useSelectGroupById} from "../../../../../../store/access/teacher/group/groupSelectors";
import {fetchGroup} from "../../../../../../store/access/teacher/group/fetchGroup";

export interface ParamsProps {
    id: string;
}

const Group: React.FC = () => {
    const {id} = useParams<ParamsProps>();
    const group = useSelectGroupById(Number(id));
    const loading = useLoadingGroups()
    const dispatch = useTeacherDispatch();

    useChangeActionNavbar({action: '/groups'});
    useChangeTitle({title: loading ? 'Группа: Загрузка...' : `Группа: ${group?.title || 'Недоступна'}`});

    useEffect(() => {
        const promise = dispatch(fetchGroup({id: Number(id)}));
        return () => {
            promise.abort();
        }
    }, [dispatch, id]);

    if(!group && !loading)
        return <NotFound/>

    return <>
        <GroupNavigation/>
        <Container/>
    </>;
};

export default Group;