import React from 'react';
import styled from "styled-components";
import HeaderTable from "./header/Header";
import {TableLayout} from "./Table.layout";

export const Result: any = styled.span`
    color: ${(props: any) => props.type ? props.theme[`color_${props.type}`] : 'initial'}
`;

const ScrollWrapper = styled.div`
  width: 100%;
  overflow-y: hidden;
  overflow-x: auto;
  margin-bottom: 0.5rem;
`;

export interface ListSettingProps {
    column: any,
    layout: React.FC<{ tableKey: number, table: any[] }>,
    leftNumbering: boolean,
}

interface TablesOutputProps {
    outputs: any[];
    listSetting: ListSettingProps,
}

const TablesOutput: React.FC<TablesOutputProps> = ({outputs, listSetting}) => {
    return <>
        {
            outputs.map((table: any, key: any) =>
                <ScrollWrapper key={key}>
                    <TableLayout>
                        <HeaderTable
                            tableKey={key} column={listSetting.column}
                            leftNumbering={listSetting.leftNumbering}
                        />
                        <listSetting.layout tableKey={key} table={table}/>
                    </TableLayout>
                </ScrollWrapper>
            )
        }
    </>;
};

export default TablesOutput;