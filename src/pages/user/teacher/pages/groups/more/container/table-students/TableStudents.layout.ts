import styled from "styled-components";
import {CardTable} from "lib/ui";

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
      padding: .5rem 1rem;
      vertical-align: middle !important;
    }
    
    .ant-table-tbody > tr > td.td-events-table {
      padding: 0;
      cursor: pointer;
      
      &.active {
        background: ${props => props.theme.color_primary + '2e'};
        border-color: ${props => props.theme.color_primary + '2e'};
      }
      
      &.selected{
        background: ${props => props.theme.color_warning + '2e'};
        border-color: ${props => props.theme.color_warning + '2e'};
      }
    }
    
    .ant-table-thead > tr > th.td-events-table {      
      cursor: pointer;
      
      &.active {
        color: ${props => props.theme.color_primary};
      }
      
      &.selected{
        z-index: 5;
        box-shadow: 0 6px 5px 0 rgb(0 0 0 / 6%);
        color: ${props => props.theme.color_warning};
      }
    }
`;

export default TableStudentsLayout;