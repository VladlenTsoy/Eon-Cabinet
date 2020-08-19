import React, {useEffect} from 'react';
import {CardStatistic} from "../../../../../../../../lib/ui";
import {TeamOutlined} from "@ant-design/icons";
import {useSelector} from "react-redux";
import {groupSelector} from "../../../../../../../../store/access/teacher/group/groupSlice";
import {fetchGroupsStatistic} from "../../../../../../../../store/access/teacher/group/statistic/fetchGroupsStatistic";
import {useTeacherDispatch} from "../../../../../../../../store/access/teacher/store";

const Groups = () => {
    const {statistic} = useSelector(groupSelector)
    const dispatch = useTeacherDispatch()

    useEffect(() => {
        const promise = dispatch(fetchGroupsStatistic())
        return () => {
            promise.abort()
        }
    }, [dispatch])

    return <CardStatistic
        title="Групп"
        icon={<TeamOutlined/>}
        theme="success"
        loading={statistic.loading}
        count={statistic.data.groups}/>;
};

export default Groups;