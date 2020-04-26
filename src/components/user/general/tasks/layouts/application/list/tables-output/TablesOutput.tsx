import React from 'react';
import styled from "styled-components";
import HeaderTable from "./header/Header";

interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
    borderStyle?: 'solid' | 'dashed'
}

export const TableWrapper: React.FC<TableProps> = styled.table<TableProps>`
  width: 100%;
  margin-bottom: 1rem;
  text-align: center;
  overflow: hidden;
  
  thead{
    th{
        padding: .3rem;
      i{
        //color: ${props => props.theme.color_second};
        background: #e9ecef;
        border-radius: 50%;
        display: inline-block;
        font-size: 14px;
        height: 20px;
        width: 20px;
      }
    }
  }
  
  td{
    padding: .3rem;
    vertical-align: top;
    border: 1px ${props => props.borderStyle || 'solid'} #dee2e6;
  }
  
  .not-border{
    border: 0;
  }
  
  .numbering{
    vertical-align: middle;
    padding: .3rem;
  
    span{
      //color: ${props => props.theme.color_second};
      background: #e9ecef;
      border-radius: 50%;
      display: inline-block;
      font-size: 14px;
      height: 20px;
      width: 20px;
    }
  }
  
  tr{
    transition: all 0.3s ease-in-out; 
    :hover{
      background: ${props => props.theme.color_primary}14;
    }
  }
`;

export const Result: any = styled.span`
    color: ${(props: any) => props.type ? props.theme[`color_${props.type}`] : 'initial'}
`;

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