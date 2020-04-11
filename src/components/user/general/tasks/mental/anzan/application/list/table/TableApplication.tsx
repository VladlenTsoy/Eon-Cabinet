import React, {useState} from 'react';
import {Card} from "lib";
import { ArrowRightOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Modal } from "antd";
import {TableWrapper} from "../../../../../layouts/application/list/card-list/table/TableExercise";
import HeaderTable from "./header-table/HeaderTable";
import TableNumbersMultiplication from "./body-table/body-numbers-multiplication/TableNumbersMultiplication";
import TableNumbersAddition from "./body-table/body-numbers-addition/TableNumbersAddition";
import {useDispatch, useSelector} from "react-redux";
import {chunk} from "lodash";
import {gameChangeStats, gameChangeStatus, gameChangeTotals} from "../../../../../../../../../store/game/actions";

declare global {
    interface Window { itemCounter: any; }
}

interface TableApplicationProps {
    form: any;
    isMultiplication: boolean;
}

const TableApplication: React.FC<TableApplicationProps> = (
    {
        form,
        isMultiplication,
    }
) => {
    const {game} = useSelector((state: any) => state);
    const {setting, totals, stats, status} = game;
    const dispatch = useDispatch();

    const [tables, setTables]: any = useState(isMultiplication ?
        chunk(chunk(totals, setting.column), setting.rows) :
        chunk(totals, setting.column)
    );

    const changeState = (status: string) =>
        dispatch(gameChangeStatus(status));

    const updateStats = (stats: any) =>
        dispatch(gameChangeStats(stats));

    const handlerSubmit = (e: any) => {
        e.preventDefault();

        Modal.confirm({
            title: 'У вас еще есть время',
            onOk: checkResult
        });
    };

    const checkResult = () => {
        form.validateFields(async (err: any, values: any) => {
            if (!err) {
                if (status === 'answer') {
                    changeState('result');
                } else {
                    const _totals = totals.map((total: any, key: number) => {
                        if (total.answer === values.answer[key])
                            stats.success++;

                        return ({
                            ...total,
                            result: total.answer === values.answer[key],
                            user: values.answer[key]
                        });
                    });
                    dispatch(gameChangeTotals(_totals));
                    updateStats(stats);
                    setTables(isMultiplication ?
                        chunk(chunk(totals, setting.column), setting.rows) :
                        chunk(_totals, setting.column)
                    );
                    changeState('answer');
                }
            }
        });
    };
    window.itemCounter = 0;

    return (
        <Card>
            <Form onSubmit={handlerSubmit}>
                {tables.map((table: any[], tableKey: number) =>
                    <TableWrapper key={tableKey}>
                        <HeaderTable tableKey={tableKey} column={setting.column}/>
                        {isMultiplication ?
                            <TableNumbersMultiplication
                                form={form}
                                table={table}
                            /> :
                            <TableNumbersAddition
                                form={form}
                                table={table}
                            />
                        }
                    </TableWrapper>
                )}
                <Button
                    type="primary"
                    htmlType="submit"
                    icon={<ArrowRightOutlined />}
                    block
                >
                    Далее
                </Button>
            </Form>
        </Card>
    );
};

export default Form.create<any>()(TableApplication);