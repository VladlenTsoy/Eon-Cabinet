import React from 'react';
import {withRouter} from "react-router";
import {Alert} from "../../../../lib";
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Collapse } from "antd";
import styled from "styled-components";

const { Panel } = Collapse;

interface HelpProps {
    history: any;
}

const CollapseWrapper = styled(Collapse)`
  &.ant-collapse{
    margin: 0 -1.5rem;
  }
`;

const Help: React.FC<HelpProps> = () => {
    const text = (
        <p style={{ paddingLeft: 24 }}>
            A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found
            as a welcome guest in many households across the world.
        </p>
    );

    return <>
        <Alert
            message="asd"
            description="asas"
            type="warning"
            showIcon
            icon={<QuestionCircleOutlined />}
        />
        <CollapseWrapper bordered={false} defaultActiveKey={['1']}>
            <Panel header="This is panel header 1" key="1">
                {text}
            </Panel>
            <Panel header="This is panel header 2" key="2">
                {text}
            </Panel>
            <Panel header="This is panel header 3" key="3">
                {text}
            </Panel>
        </CollapseWrapper>
    </>;
};

export default withRouter(Help);