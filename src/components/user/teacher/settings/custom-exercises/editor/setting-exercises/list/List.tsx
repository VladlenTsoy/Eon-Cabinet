import React, {useCallback, useState} from 'react';
import {TableWrapper} from "../../../../../../general/tasks/layouts/application/list/card-list/table/TableExercise";
import HeaderTable from "../../../../../../general/tasks/mental/anzan/application/list/table/header-table/HeaderTable";
import {Card} from "../../../../../../../../lib";
import {Button, Form} from "antd";
import SaveButton from "../save-button/SaveButton";
import Table from "./table/Table";
import styled from "styled-components";
import {PlusOutlined} from "@ant-design/icons";

const TableStyleWrapper = styled(TableWrapper)`
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
    setupSetting: { control_mode: string, type_task: string };
}

const List: React.FC<ListProps> = ({setupSetting}) => {
    const [form] = Form.useForm();
    const [tables, setTables] = useState<number[]>([0]);

    const onClickHandler = (key: number) => {
        setTables((prevState) => [...prevState, key])
    };

    const onDeleteHandler = useCallback((_table: number) => {
        setTables((prevState) => prevState.filter((table) => table !== _table))
    }, []);

    let nextKey = tables.length ? Math.max.apply(null, tables) : -1;

    return <Card>
        <Form form={form}>
            <ScrollWrapper>
                {
                    tables.map(
                        (table, key) =>
                            <TableStyleWrapper key={table} borderStyle="dashed" className="animated fadeIn">
                                <HeaderTable tableKey={key} column={6} leftNumbering/>
                                <Table
                                    tableKey={table}
                                    tableIndex={key}
                                    setupSetting={setupSetting}
                                    tableDeleteHandler={onDeleteHandler}
                                />
                            </TableStyleWrapper>
                    )
                }

                <Button
                    block
                    icon={<PlusOutlined/>}
                    onClick={() => onClickHandler(++nextKey)}
                >
                    Добавить таблицу
                </Button>

            </ScrollWrapper>
            <SaveButton form={form} setupSetting={setupSetting}/>
        </Form>
    </Card>;
};

export default List;