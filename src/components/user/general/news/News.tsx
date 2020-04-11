import React from "react";
import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse } from "antd";
import styled from "styled-components";

const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

// const customPanelStyle = {
//     background: '#f7f7f7',
//     borderRadius: 4,
//     marginBottom: 24,
//     border: 0,
//     overflow: 'hidden',
// };

const PanelWrapper = styled(Panel)` 
  .ant-collapse > &.ant-collapse-item{
      background: ${props => props.theme['@layout-body-background']};
      border: 0;
      margin-bottom: 24px;
      overflow: hidden;
      border-radius: 4px;
  }
`;

const News: React.FC = () => {
    return <>
        <Collapse
            bordered={false}
            defaultActiveKey={['1']}
            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
        >
            <PanelWrapper header="This is panel header 1" key="1">
                <p>{text}</p>
            </PanelWrapper>
            <PanelWrapper header="This is panel header 2" key="2">
                <p>{text}</p>
            </PanelWrapper>
            <PanelWrapper header="This is panel header 3" key="3">
                <p>{text}</p>
            </PanelWrapper>
        </Collapse>
    </>;
};

export default News;