import React, {useState} from 'react';
import Addition from "../../item/addition/Addition";
import {Button} from "antd";
import {PlusOutlined} from "@ant-design/icons";

interface TableAdditionProps {

}

const TableAddition: React.FC<TableAdditionProps> = () => {
    const [rows, setRows] = useState<any[]>([]);
    const tables = Array(10).fill(1);
    let times = 0;

    const onClickHandler = () => {
        setRows((prevState) => [...prevState, true])
    };

    return <tbody>
    {
        rows.map((row: any, key) =>
            <tr key={key}>
                {
                    tables.map((td: any, tdKey: number) =>
                        <td key={tdKey}>
                            <Addition times={times++}/>
                        </td>
                    )
                }
            </tr>
        )
    }
    <tr>
        <td colSpan={10}>
            <Button type="dashed" block icon={<PlusOutlined/>} onClick={onClickHandler}>
                Добавить строку
            </Button>
        </td>
    </tr>
    </tbody>;
};

export default TableAddition;