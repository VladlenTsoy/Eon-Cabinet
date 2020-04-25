import React from 'react';
import styled from "styled-components";
import HeaderTable from "../../../../mental/anzan/application/_old/list/table/header-table/HeaderTable";
import {TableWrapper} from "../../_old/list/card-list/table/TableExercise";

const ScrollWrapper = styled.div`
  width: 100%;
  overflow-y: hidden;
  overflow-x: auto;
  margin-bottom: 0.5rem;
`;

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

interface TablesOutputProps {
    outputs: any[];
    listSetting: {
        column: any,
        list: any,
        leftNumbering: boolean,
    },
}

const TablesOutput: React.FC<TablesOutputProps> = ({outputs, listSetting}) => {
    console.log(outputs);
    return <>
        {
            outputs.map((table: any, key: any) =>
                <ScrollWrapper key={key}>
                    <TableCustom>
                        <HeaderTable
                            tableKey={key} column={listSetting.column}
                            leftNumbering={listSetting.leftNumbering}
                        />
                        <listSetting.list tableKey={key} table={table}/>
                    </TableCustom>
                </ScrollWrapper>
            )
        }
    </>;
};

export default TablesOutput;