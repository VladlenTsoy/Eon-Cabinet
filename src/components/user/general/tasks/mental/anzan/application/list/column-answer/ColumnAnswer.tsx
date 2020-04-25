import React from 'react';
import {FormItem} from "../../../../../../../../../lib";
import {Input} from "antd";

interface RowAnswerProps {
    autoFocus?: boolean;
    column: any[];
    name: (string | number)[]
}

const ColumnAnswer: React.FC<RowAnswerProps> = (
    {
        column,
        name,
        autoFocus
    }
) => {
    return <>
        {
            column.map((row: any, rowKey: number) =>
                <td key={rowKey}>
                    <FormItem name={[...name, rowKey]} marginBottom="0">
                        <Input
                            style={{width: '100%', minWidth: '80px',}}
                            type="number"
                            placeholder="Ответ"
                            autoComplete="off"
                            autoFocus={!!autoFocus && rowKey === 0}
                        />
                    </FormItem>
                </td>
            )
        }
    </>;
};

export default React.memo(ColumnAnswer);