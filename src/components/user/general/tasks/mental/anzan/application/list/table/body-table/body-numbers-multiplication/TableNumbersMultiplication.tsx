import React from "react";
import {TableNumbersAdditionProps} from "../body-numbers-addition/TableNumbersAddition";
import {Result} from "../../../../../../../layouts/application/list/card-list/table/TableExercise";
import {useSelector} from "react-redux";
import AnswerTable from "../../answer-table/AnswerTable";

const TableNumbersMultiplication: React.FC<TableNumbersAdditionProps> = ({form, table}) => {
    const {game} = useSelector((state: any) => state);
    const {status} = game;

    return <tbody>
    {table.map((column: any, columnKey: number) =>
        [
            <tr key={columnKey}>
                {column.map((row: any, rowKey: number) =>
                    <td key={rowKey}>
                        {row.exercise}
                    </td>
                )}
            </tr>,
            status === 'answer' ? [
                    <tr key={`title-user-${columnKey}`}>
                        <td colSpan={200}><b>Ваши ответы</b></td>
                    </tr>,
                    <tr key={`user-${columnKey}`}>
                        {column.map((row: any, rowKey: number) =>
                            <td key={rowKey}>
                                {row.user ? <Result type="success">{row.user}</Result> :
                                    <Result type="danger">Пусто</Result>}
                            </td>
                        )}
                    </tr>,
                    <tr key={`title-answer-${columnKey}`}>
                        <td colSpan={200}><b>Правильные ответы</b></td>
                    </tr>,
                    <tr key={`answer-${columnKey}`}>
                        {column.map((row: any, rowKey: number) =>
                            <td key={rowKey}>{row.answer}</td>
                        )}
                    </tr>,
                    <tr key={`title-empty-${columnKey}`}>
                        <td colSpan={200} style={{border: '0px'}}/>
                    </tr>,
                ] :
                <tr key={`answer-${columnKey}`}>
                    <AnswerTable form={form} table={column}/>
                </tr>
        ]
    )}
    </tbody>;
};

export default TableNumbersMultiplication;