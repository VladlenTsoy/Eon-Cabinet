import React from "react";
import {FormItem} from "lib";
import {Input} from "antd";

interface ListProps {
    table: any[];
}

const List: React.FC<ListProps> = ({table}) => {
    return <tbody>
    {
        table.map((total: any, keyTr) =>
            <tr key={keyTr}>
                <td className="not-border numbering">
                    <span>{keyTr + 1}</span>
                </td>
                {
                    total.map((val: any, key: number) =>
                        <td key={key}>
                            <FormItem name={['answer', keyTr, key]} marginBottom="0">
                                <Input placeholder="Ответ" size="large" style={{minWidth: '70px'}}/>
                            </FormItem>
                        </td>
                    )
                }
            </tr>
        )
    }
    </tbody>;
};

export default List;