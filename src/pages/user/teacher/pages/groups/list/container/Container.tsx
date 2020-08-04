import React from 'react';
import {Col, Row} from "antd";
import GroupBlock from "./card-group/CardGroup";
import {GroupProps} from "../../../../../../../store/access/teacher/group/groupSlice";
import GroupsEmpty from "./groups-empty/GroupsEmpty";

interface ContainerProps {
    groups: GroupProps[];
}

const Container:React.FC<ContainerProps> = ({groups}) => {
    if(!groups.length)
        return <GroupsEmpty/>

    return <Row gutter={15}>
        {groups.map((group: any) =>
            <Col xxl={6} lg={8} md={12} sm={12} xs={24} key={group.id}>
                <GroupBlock group={group}/>
            </Col>
        )}
    </Row>;
};

export default React.memo(Container);