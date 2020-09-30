import React from "react";
import Table from "antd/lib/table";
import styled from "styled-components";

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

// TODO - возможно заменить на usingTable
const CardTable: React.FC<any> = (props) =>
        <TableWrapper {...props}/>

export default CardTable;