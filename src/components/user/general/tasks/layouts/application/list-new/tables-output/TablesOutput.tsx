import React, {useState} from 'react';
import styled from "styled-components";
import {useSelector} from "react-redux";
import {totalsSelect} from "../../../../../../../../store/tasks/totals/reducer";
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
    setting: SettingAnzanListProps;
}

const TablesOutput:React.FC<TablesOutputProps> = ({setting}) => {
    const totals = useSelector(totalsSelect);
    const totalsValues = Object.values(totals);
    const [isMultiplication] = useState(setting.mode === 'multiply' || setting.mode === 'divide');

    const [tables]: any = useState(isMultiplication ?
        chunk(chunk(totalsValues, setting.column), setting.rows) :
        chunk(totalsValues, setting.column)
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