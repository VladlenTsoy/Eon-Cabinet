import React, {useEffect} from 'react';
import {CardStatistic} from "../../../../../../../../lib/ui";
import {TeamOutlined} from "@ant-design/icons";
import {useTeacherDispatch} from "../../../../../../../../store/access/teacher/store";
import {
    useCountStatisticGroups,
    useLoadingStatisticGroups
} from "../../../../../../../../store/access/teacher/group/groupSelectors";
import {fetchStatisticsGroups} from "../../../../../../../../store/access/teacher/group/fetchStatisticsGroups";

const Groups = () => {
    const loading = useLoadingStatisticGroups()
    const count = useCountStatisticGroups()
    const dispatch = useTeacherDispatch()

    useEffect(() => {
        const promise = dispatch(fetchStatisticsGroups())
        return () => {
            promise.abort()
        }
    }, [dispatch])

    return <CardStatistic
        title="Групп"
        icon={<TeamOutlined/>}
        theme="success"
        loading={loading}
        count={count}/>;
};

export default Groups;