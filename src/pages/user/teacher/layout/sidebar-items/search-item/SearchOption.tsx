import React from "react";
import { ClockCircleOutlined, CloudDownloadOutlined } from '@ant-design/icons';
import styled from "styled-components";

const TimeWrapper = styled.span`
    color: ${props => props.theme.color_second};
    margin-right: 0.5rem;

    i {
      margin-right: 0.5rem;
    }
`;

const IdWrapper = styled.span`
    margin-left: 0.5rem;

    i {
      color: ${props => props.theme.color_primary};
      margin-left: 0.5rem;
    }
`;

const SearchOption: React.FC<any> = ({item}) =>
    <>
        <TimeWrapper><ClockCircleOutlined />{item.created}</TimeWrapper>
        -
        <IdWrapper>{item.id}<CloudDownloadOutlined /></IdWrapper>
    </>;

export default SearchOption;