import React from 'react';
import ColumnAnswer from "../column-answer/ColumnAnswer";

interface TbodyAdditionProps {
    table: any;
    tableKey: number;
}

const TbodyAddition: React.FC<TbodyAdditionProps> = ({table, tableKey}) => {
    return <tbody>
    {
        table[0].map((tr: any, trKey: number) =>
            <tr key={trKey}>
                {table.map((column: any, columnKey: number) =>
                    <td key={columnKey}>{column[trKey]}</td>
                )}
            </tr>
        )
    }
    <tr>
        <ColumnAnswer
            column={table}
            name={['answer', tableKey]}
            autoFocus={tableKey === 0}
        />
    </tr>
    </tbody>;
};

export default React.memo(TbodyAddition);