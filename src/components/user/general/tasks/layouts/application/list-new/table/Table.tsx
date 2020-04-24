import React from 'react';
import styled from "styled-components";
import {TableWrapper} from "../../list/card-list/tables-output/table/TableExercise";

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

}

const Table: React.FC<TableProps> = () => {
    return <TableCustom>

    </TableCustom>;
};

export default Table;