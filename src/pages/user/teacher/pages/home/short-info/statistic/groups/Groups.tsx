import React, {useEffect} from 'react';
import {CardStatistic} from "../../../../../../../../lib/ui";
import {TeamOutlined} from "@ant-design/icons";
import {useTeacherDispatch} from "../../../../../../../../store/access/teacher/store";
import {fetchGroups} from "../../../../../../../../store/access/teacher/group/fetchGroups";
import {
    useLoadingGroups,
    useSelectTotalGroups
} from "../../../../../../../../store/access/teacher/group/groupSelectors";

const Groups = () => {
    const total = useSelectTotalGroups()
    const loading = useLoadingGroups()
    const dispatch = useTeacherDispatch()

    useEffect(() => {
        const promise = dispatch(fetchGroups())
        return () => {
            promise.abort()
        }
    }, [dispatch])

    return <CardStatistic
        title="Групп"
        icon={<TeamOutlined/>}
        theme="success"
        loading={loading}
        count={total}/>;
};

export default Groups;