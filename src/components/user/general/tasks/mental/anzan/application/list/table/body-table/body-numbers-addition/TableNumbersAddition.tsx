import React from 'react';
import {useSelector} from "react-redux";
import {Result} from "../../../../../../../layouts/application/list/card-list/table/TableExercise";
import AnswerTable from "../../answer-table/AnswerTable";

export interface TableNumbersAdditionProps {
    table: any;
}

const TableNumbersAddition: React.FC<TableNumbersAdditionProps> = ({table}) => {
    const {game} = useSelector((state: any) => state);
    const {status} = game;

    return <tbody>
    {table[0].exercise.map((tr: any, trKey: number) =>
        [
            <tr key={trKey}>
                {table.map((column: any, columnKey: number) =>
                    <td key={columnKey}>{column.exercise[trKey]}</td>
                )}
            </tr>,
            trKey + 1 === table[0].exercise.length ?
                status === 'answer' ? [
                        <tr key={`a-${trKey}`}>
                            <td colSpan={200}><b>Ваши ответы</b></td>
                        </tr>,
                        <tr key={`b-${trKey}`}>
                            {table.map((column: any, columnKey: number) =>
                                <td key={columnKey}>
                                    {column.user ?
                                        <Result type="success">{column.user}</Result> :
                                        <Result type="danger">Пусто</Result>}
                                </td>
                            )}
                        </tr>,
                        <tr key={`c-${trKey}`}>
                            <td colSpan={200}><b>Правильные ответы</b></td>
                        </tr>,
                        <tr key={`d-${trKey}`}>
                            {table.map((column: any, columnKey: number) =>
                                <td key={columnKey}>{column.answer}</td>
                            )}
                        </tr>
                    ] :
                    <tr key="answers">
                        <AnswerTable table={table}/>
                    </tr> : null
        ]
    )}
    </tbody>;
};

export default TableNumbersAddition;