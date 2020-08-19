import React from 'react';
import {Col, Row} from "antd";
import GroupBlock from "./card-group/CardGroup";
import GroupsEmpty from "./groups-empty/GroupsEmpty";
import {Group} from "../../../../../../../lib/types/teacher/Group";

interface ContainerProps {
    groups: Group[];
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