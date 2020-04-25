import React, {useState} from 'react';
import styled from "styled-components";
import Table from "./table/Table";
import {SettingAnzanListProps} from "../../../../../../../../store/tasks/setting/games-types/anzan.types";
import {chunk} from "lodash";

const TablesOutputWrapper = styled.div`
  width: 100%;
  overflow-y: hidden;
  overflow-x: auto;
  margin-bottom: 0.5rem;
`;

interface TablesOutputProps {
    outputs: any[];
    setting: SettingAnzanListProps;
}

const TablesOutput: React.FC<TablesOutputProps> = ({outputs, setting}) => {
    const [isMultiplication] = useState(setting.mode === 'multiply' || setting.mode === 'divide');

    const [tables]: any = useState(isMultiplication ?
        chunk(chunk(outputs, setting.column), setting.rows) :
        chunk(outputs, setting.column)
    );

    return <>
        {
            tables.map((table: any, key: any) =>
                <TablesOutputWrapper key={key}>
                    <Table column={setting.column} isMultiplication={isMultiplication} tableKey={key} table={table}/>
                </TablesOutputWrapper>
            )
        }
    </>
};

export default TablesOutput;