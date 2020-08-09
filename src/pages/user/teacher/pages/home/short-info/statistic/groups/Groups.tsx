import React, {useEffect} from 'react';
import {CardStatistic} from "../../../../../../../../lib/components";
import {TeamOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {groupSelector} from "../../../../../../../../store/access/teacher/group/groupSlice";
import {fetchGroupsStatistic} from "../../../../../../../../store/access/teacher/group/statistic/fetchGroupsStatistic";

const Groups = () => {
    const {statistic} = useSelector(groupSelector)
    const dispatch = useDispatch()

    useEffect(() => {
        const promise = dispatch(fetchGroupsStatistic())
        return () => {
            promise.abort()
        }
    }, [])

    return <CardStatistic
        title="Групп"
        icon={<TeamOutlined/>}
        theme="success"
        loading={statistic.loading}
        count={statistic.data.groups}/>;
};

export default Groups;