import React from 'react';
import {Input} from "antd";

declare global {
    interface Window { itemCounter: any; }
}

interface AnswerTableProps {
    form: any;
    table: any;
}

const AnswerTable: React.FC<AnswerTableProps> = ({form, table}) => {
    const {getFieldDecorator} = form;

    return table.map((column: any, columnKey: number) =>

        <td key={columnKey}>
            {getFieldDecorator(`answer[${window.itemCounter++}]`)(
                <Input
                    type="number"
                    placeholder="Ответ"
                    autoComplete="off"
                    autoFocus={window.itemCounter === 1}
                />
            )}
        </td>
    );
};

export default AnswerTable;