import React from 'react';
import styled from "styled-components";
import {TableWrapper} from "../../../list/card-list/table/TableExercise";
import HeaderTable from "../../../../../mental/anzan/application/list/table/header-table/HeaderTable";
import TbodyMultiplication from "./tbody-multiplication/TbodyMultiplication";
import TbodyAddition from "./tbody-addition/TbodyAddition";

const TableCustom = styled(TableWrapper)`
  user-select: none;
  width: 100%;
  margin-bottom: 0.5rem;
  
  tbody{
    tr:hover{
      background: ${props => props.theme.color_border};
    }
  }
`;

interface TableProps {
    isMultiplication: boolean;
    tableKey: number;
    table: any;
    column: number;
}

const Table: React.FC<TableProps> = ({isMultiplication, column, table, tableKey}) => {
    return <TableCustom>
        <HeaderTable tableKey={tableKey} column={column}/>
        {
            isMultiplication ?
                <TbodyMultiplication table={table} tableKey={tableKey}/> :
                <TbodyAddition table={table} tableKey={tableKey}/>
        }
    </TableCustom>;
};

export default Table;