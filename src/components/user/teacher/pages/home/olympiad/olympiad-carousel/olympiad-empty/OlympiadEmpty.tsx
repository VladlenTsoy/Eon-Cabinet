import React from 'react';
import styled from "styled-components";
import {Card} from "lib";
import {Empty} from "antd";

const OlympiadEmptyWrapper = styled(Card)`
  &.ant-card{
      height: 100%;
      box-shadow: ${props => props.theme.shadow_primary};
      margin-bottom: 1rem;

      .ant-card-body{
        .ant-empty-normal{
          margin: 64px 0;
        }
      }
  }
`;

const OlympiadEmpty = () => {
    return <OlympiadEmptyWrapper>
        <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
    </OlympiadEmptyWrapper>
};

export default React.memo(OlympiadEmpty);