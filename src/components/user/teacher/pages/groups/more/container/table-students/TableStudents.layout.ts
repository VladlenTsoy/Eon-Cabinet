import styled from "styled-components";
import {CardTable} from "lib";

const TableStudentsLayout = styled(CardTable)`
    white-space: nowrap;
    
    .tr-student-block{
      background: rgba(255, 0, 0, 0.2);
      opacity: 0.5;
    }
    
    .ant-table-thead > tr.ant-table-row-hover:not(.ant-table-expanded-row) > td,
    .ant-table-tbody > tr.ant-table-row-hover:not(.ant-table-expanded-row) > td,
    .ant-table-thead > tr:hover:not(.ant-table-expanded-row) > td,
    .ant-table-tbody > tr:hover:not(.ant-table-expanded-row) > td {
      //background: none;
    }

    .ant-table-thead > tr > th {
      background: transparent;
      font-weight: bolder;
      
      &.td-homework-table{
        text-align: left;
      }
    }
    
    tbody {
      .ant-checkbox-inner {
        height: 30px;
        width: 30px;

        &::after {
          top: 45%;
          left: 26.5%;
          width: 9.714286px;
          height: 15.142857px;
        }
      }
    }
    
    & tbody > tr > td {
      vertical-align: top;
    }
    
    .ant-table-thead > tr > th, .ant-table-tbody > tr > td{
      background: ${props => props.theme['@component-background']};
      padding: .3rem 16px;
      vertical-align: middle !important;
    }
    
    .ant-table-tbody > tr > td.td-homework-table {
      padding: 0;
    }
`;

export default TableStudentsLayout;