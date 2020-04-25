import React from 'react';
import ColumnAnswer from "../column-answer/ColumnAnswer";

interface TbodyMultiplicationProps {
    table: any;
    tableKey: number;
}

const TbodyMultiplication: React.FC<TbodyMultiplicationProps> = ({table, tableKey}) => {
    return <tbody>
    {
        table.map((column: any, columnKey: number) =>
            [
                <tr key={columnKey}>
                    {column.map((row: any, rowKey: number) =>
                        <td key={rowKey}>
                            {row}
                        </td>
                    )}
                </tr>,
                <tr key={`answer-${columnKey}`}>
                    <ColumnAnswer
                        column={column}
                        name={['answer', tableKey, columnKey]}
                        autoFocus={tableKey === 0 && columnKey === 0}
                    />
                </tr>
            ]
        )
    }
    </tbody>;
};

export default React.memo(TbodyMultiplication);