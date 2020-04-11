import React from "react";
import Table from "antd/lib/table";
import styled from "styled-components";
import Card from "../card/Card";

const CardWrapper = styled(Card)`
  &.ant-card{
    overflow-y: hidden;
    overflow-x: auto;

    .ant-card-body {
      border-radius: 10px;
      padding: 0;
      white-space: nowrap;
    }
  }
`;

const TableWrapper = styled(Table)`
  .ant-table-body, .ant-table-body-outer {
    .ant-table-thead > tr > th {
      background: transparent;
      padding: 10px 16px;
      color: ${props => props.theme['@text-color-secondary']};
      text-align: center;
    }

    .ant-table-tbody {
      text-align: center;
    }
  }
  
  .ant-table-pagination.ant-pagination{
    margin: 16px 16px;
  }
`;

const CardTable: React.FC<any> = (props) =>
    <CardWrapper>
        <TableWrapper {...props}/>
    </CardWrapper>;

export default CardTable;