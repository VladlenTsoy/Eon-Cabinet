import React from 'react';
import {Form, Input} from "antd";

declare global {
    interface Window {
        itemCounter: any;
    }
}

interface AnswerTableProps {
    table: any;
}

const AnswerTable: React.FC<AnswerTableProps> = ({ table}) => {
    return table.map((column: any, columnKey: number) =>
        <td key={columnKey}>
            <Form.Item name={`answer[${window.itemCounter++}]`}>
                <Input
                    type="number"
                    placeholder="Ответ"
                    autoComplete="off"
                    autoFocus={window.itemCounter === 1}
                />
            </Form.Item>
        </td>
    );
};

export default AnswerTable;