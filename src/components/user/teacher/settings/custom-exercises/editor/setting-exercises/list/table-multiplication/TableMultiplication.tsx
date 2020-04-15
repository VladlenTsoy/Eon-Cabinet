import React, {useState} from 'react';
import {Button} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import Multiplication from "../../item/multiplication/Multiplication";

interface TableMultiplicationProps {
    setupSetting: { control_mode: string, type_task: string };
}

const TableMultiplication: React.FC<TableMultiplicationProps> = ({setupSetting}) => {
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
                            <Multiplication times={times++} controlMode={setupSetting.control_mode}/>
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

export default TableMultiplication;