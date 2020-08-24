import React, {useEffect} from 'react';
import {Col, Row} from "antd";
import GroupBlock from "../card-group/CardGroup";
import {
    useSelectGroupsByCategoryId
} from "../../../../../../../../store/access/teacher/group/groupSelectors";
import {useTeacherDispatch} from "../../../../../../../../store/access/teacher/store";
import {fetchGroups} from "../../../../../../../../store/access/teacher/group/fetchGroups";
import GroupsEmpty from "../groups-empty/GroupsEmpty";

interface GroupsGridProps {
    categoryId: number
}

const GroupsGrid:React.FC<GroupsGridProps> = ({categoryId}) => {
    const groups = useSelectGroupsByCategoryId(categoryId)
    const dispatch = useTeacherDispatch();

    useEffect(() => {
        const promise = dispatch(fetchGroups({categoryId}))
        return () => {
            promise.abort()
        }
    }, [dispatch])

    if(!groups.length)
        return <GroupsEmpty/>

    return <Row gutter={15}>
        {groups.map((group) =>
            <Col xxl={6} xl={8} lg={12} xs={24} key={group.id}>
                <GroupBlock group={group}/>
            </Col>
        )}
    </Row>
};

export default GroupsGrid;