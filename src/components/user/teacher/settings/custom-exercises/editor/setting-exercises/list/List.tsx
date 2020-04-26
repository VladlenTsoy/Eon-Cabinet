import React from 'react';
import {TableLayout} from "../../../../../../general/tasks/layouts/application/list/tables-output/Table.layout";
import HeaderTable from "../../../../../../general/tasks/layouts/application/list/tables-output/header/Header";
import {Card} from "../../../../../../../../lib";
import {Form} from "antd";
import SaveButton from "../layouts/save-button/SaveButton";
import Table from "./table/Table";
import styled from "styled-components";

const TableStyleWrapper = styled(TableLayout)`
  td{
    padding: .5rem;
  }
`;

const ScrollWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  margin-bottom: 0.5rem;
`;

interface ListProps {
    setupSetting: any;
}

const List: React.FC<ListProps> = ({setupSetting}) => {
    const [form] = Form.useForm();

    return <Card>
        <Form form={form}>
            <ScrollWrapper>
                {
                    Array(setupSetting.tables).fill(1)
                        .map((table, key) =>
                            <TableStyleWrapper key={key} borderStyle="dashed">
                                <HeaderTable tableKey={key} column={setupSetting.column} leftNumbering/>
                                <Table
                                    tableKey={key}
                                    setupSetting={setupSetting}
                                />
                            </TableStyleWrapper>
                        )
                }
            </ScrollWrapper>
            <SaveButton form={form} setupSetting={setupSetting}/>
        </Form>
    </Card>;
};

export default List;