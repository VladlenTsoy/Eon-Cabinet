import React from 'react';
import {Input} from "antd";
import {FormItem} from "lib";

declare global {
    interface Window {
        itemCounter: any;
    }
}

interface AnswerTableProps {
    table: any;
}

const AnswerTable: React.FC<AnswerTableProps> = ({table}) => {
    return table.map((column: any, columnKey: number) =>
        <td key={columnKey}>
            <FormItem name={['answer', window.itemCounter++]} marginBottom="0">
                <Input
                    style={{
                        width: '100%',
                        minWidth: '80px',
                    }}
                    type="number"
                    placeholder="Ответ"
                    autoComplete="off"
                    autoFocus={window.itemCounter === 1}
                />
            </FormItem>
        </td>
    );
};

export default AnswerTable;