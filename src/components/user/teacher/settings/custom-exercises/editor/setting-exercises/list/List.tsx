import React from 'react';
import {TableWrapper} from "../../../../../../general/tasks/layouts/application/list/card-list/table/TableExercise";
import HeaderTable from "../../../../../../general/tasks/mental/anzan/application/list/table/header-table/HeaderTable";
import {Card} from "../../../../../../../../lib";
import {Form} from "antd";
import SaveButton from "../save-button/SaveButton";
import TableAddition from "./table-addition/TableAddition";
import TableMultiplication from "./table-multiplication/TableMultiplication";
import styled from "styled-components";

const ScrollWrapper = styled.div`
  width: 100%;
  overflow: scroll;
  margin-bottom: 0.5rem;
`;

interface ListProps {
    setupSetting: { control_mode: string, type_task: string };
}

const List: React.FC<ListProps> = ({setupSetting}) => {
    const [form] = Form.useForm();

    return <Card>
        <Form form={form}>
            <ScrollWrapper>
                <TableWrapper>
                    <HeaderTable tableKey={1} column={10}/>
                    {
                        setupSetting.control_mode === 'addition' ?
                            <TableAddition/> :
                            <TableMultiplication setupSetting={setupSetting}/>
                    }

                </TableWrapper>
            </ScrollWrapper>
            <SaveButton form={form} setupSetting={setupSetting}/>
        </Form>
    </Card>;
};

export default List;