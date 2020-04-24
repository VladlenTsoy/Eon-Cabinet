import React, {useState} from 'react';
import {Card} from "lib";
import {ArrowRightOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import {Button, Modal, Form} from "antd";
import {TableWrapper} from "../../../../../layouts/application/list/card-list/table/TableExercise";
import HeaderTable from "./header-table/HeaderTable";
import TableNumbersMultiplication from "./body-table/body-numbers-multiplication/TableNumbersMultiplication";
import TableNumbersAddition from "./body-table/body-numbers-addition/TableNumbersAddition";
import {useDispatch, useSelector} from "react-redux";
import {chunk} from "lodash";
import {gameChangeStats, gameChangeStatus} from "../../../../../../../../../store/game/actions";
import styled from "styled-components";
import {totalsChange} from "../../../../../../../../../store/tasks/totals/action";

const ScrollWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  margin-bottom: 0.5rem;
`;

declare global {
    interface Window {
        itemCounter: any;
    }
}

interface TableApplicationProps {
    isMultiplication: boolean;
}

const TableApplication: React.FC<TableApplicationProps> = (
    {
        isMultiplication,
    }
) => {
    const [form] = Form.useForm();
    const {game} = useSelector((state: any) => state);
    const {setting, totals, stats, status} = game;
    const dispatch = useDispatch();

    const [tables, setTables]: any = useState(isMultiplication ?
        chunk(chunk(totals, setting.column), setting.rows) :
        chunk(totals, setting.column)
    );

    const changeState = (status: any) =>
        dispatch(gameChangeStatus(status));

    const updateStats = (stats: any) =>
        dispatch(gameChangeStats(stats));

    const handlerSubmit = (values: any) => {
        if (status === 'answer')
            changeState('result');
        else
            Modal.confirm({
                icon: <ExclamationCircleOutlined/>,
                title: 'У вас еще есть время',
                onOk: () => checkResult(values)
            });
    };

    const checkResult = (values: any) => {
        if (status === 'answer') {
            changeState('result');
        } else {
            const _totals = totals.map((total: any, key: number) => {
                if (Number(total.answer) === Number(values.answer[key]))
                    stats.success++;

                return ({
                    ...total,
                    result: Number(total.answer) === Number(values.answer[key]),
                    user: values.answer[key]
                });
            });
            dispatch(totalsChange(_totals));
            updateStats(stats);
            setTables(isMultiplication ?
                chunk(chunk(_totals, setting.column), setting.rows) :
                chunk(_totals, setting.column)
            );
            changeState('answer');
        }
    };
    window.itemCounter = 0;

    return <Card>
        <Form onFinish={handlerSubmit} form={form}>
            {tables.map((table: any[], tableKey: number) =>
                <ScrollWrapper>
                    <TableWrapper key={tableKey}>
                        <HeaderTable tableKey={tableKey} column={setting.column}/>
                        {isMultiplication ?
                            <TableNumbersMultiplication table={table}/> :
                            <TableNumbersAddition table={table}/>
                        }
                    </TableWrapper>
                </ScrollWrapper>
            )}
            <Button
                type="primary"
                htmlType="submit"
                icon={<ArrowRightOutlined/>}
                block
            >
                Далее
            </Button>
        </Form>
    </Card>
};

export default TableApplication;